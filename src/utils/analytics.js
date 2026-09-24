import { getAnonymousId, getSessionId, isNewSession, markSessionStarted } from "./session";
import { getDeviceInfo, getIpLocation, getGpsLocation } from "./deviceInfo";
import {
  trackSessionStart,
  trackSessionEnd,
  trackPageEnter,
  trackPageExit,
  trackEvent as trackEventApi,
  trackEventBeacon,
  trackLocation as trackLocationApi,
} from "../api";
import { savePortfolioUserId } from "./userId";

// throttle/debounce (no lodash dependency)
function throttle(fn, wait) {
  let last = 0;
  let timer = null;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      last = now;
      fn(...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn(...args);
      }, remaining);
    }
  };
}

function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

// module state
const state = {
  sessionId: null,
  anonymousId: null,
  userId: null,
  startedAt: null,
  currentPage: null,
  pageEnteredAt: null,
  maxScrollDepth: 0,
  listenersAttached: false,
};

function baseIds() {
  return { sessionId: state.sessionId, anonymousId: state.anonymousId, userId: state.userId };
}

// Session lifecycle
async function initSession(userId = null) {
  state.sessionId = getSessionId();
  state.anonymousId = getAnonymousId();
  state.userId = userId || null;
  state.startedAt = Date.now();

  if (userId) savePortfolioUserId(userId);

  if (!isNewSession()) return; 
  markSessionStarted();

  const { screenResolution, language, timezone, networkType } = getDeviceInfo();

  try {
    await trackSessionStart({
      ...baseIds(),
      screenResolution,
      language,
      timezone,
      networkType,
    });
  } catch (err) {
    console.log("[analytics] session start failed:", err.message);
  }

  // location — never blocks the rest of the app
  fetchAndSendLocation();
}

async function fetchAndSendLocation() {
  try {
    const [ipLocation, gpsLocation] = await Promise.all([
      getIpLocation(),
      getGpsLocation(),
    ]);
    await trackLocationApi({ ...baseIds(), ipLocation, gpsLocation });
  } catch (err) {
    console.log("[analytics] location tracking failed:", err.message);
  }
}

function endSession() {
  if (!state.sessionId) return;
  const duration = Math.floor((Date.now() - state.startedAt) / 1000);
  trackSessionEnd({ sessionId: state.sessionId, duration });
}

// Page tracking
function enterPage(pageUrl) {
  if (state.currentPage) exitPage();

  state.currentPage = pageUrl;
  state.pageEnteredAt = Date.now();
  state.maxScrollDepth = 0;

  trackPageEnter({
    ...baseIds(),
    pageUrl,
    referrer: document.referrer || "",
  }).catch((err) => console.log("[analytics] page enter failed:", err.message));
}

function exitPage(useBeacon = false) {
  if (!state.currentPage) return;
  const duration = Math.floor((Date.now() - state.pageEnteredAt) / 1000);

  const payload = {
    ...baseIds(),
    pageUrl: state.currentPage,
    exitTime: new Date().toISOString(),
    duration,
    maxScrollDepth: state.maxScrollDepth,
  };

  if (useBeacon) {
    trackPageExit(payload);
  } else {
    trackPageEnter(payload).catch(() => {}); 
  }
}

// Event tracking (click / scroll / form / visibility)
function sendEvent(type, target, metadata = {}, useBeacon = false) {
  const payload = { ...baseIds(), type, target, pageUrl: state.currentPage, metadata };
  const fn = useBeacon ? trackEventBeacon : trackEventApi;
  Promise.resolve(fn(payload)).catch(() => {});
}

function describeTarget(el) {
  if (!el || el === document) return "document";
  const id = el.id ? `#${el.id}` : "";
  const cls = el.className && typeof el.className === "string"
    ? `.${el.className.trim().split(/\s+/).slice(0, 2).join(".")}`
    : "";
  return `${el.tagName?.toLowerCase() || "node"}${id}${cls}`;
}

const handleClick = throttle((e) => {
  const target = e.target.closest("button, a, [role='button'], input[type='submit']") || e.target;
  sendEvent("click", describeTarget(target), {
    text: (target.innerText || target.value || "").slice(0, 80),
    href: target.href || undefined,
  });
}, 300);

const handleScroll = throttle(() => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const depth = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 100;
  if (depth > state.maxScrollDepth) {
    state.maxScrollDepth = depth;
  }
}, 500);

const handleFormFocus = (e) => {
  const el = e.target;
  if (!["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
  sendEvent("form_focus", describeTarget(el), { name: el.name || "" });
};

const handleVisibility = () => {
  sendEvent("visibility", "document", { state: document.visibilityState });
};

// Public API
export const analytics = {
  init(userId = null) {
    initSession(userId);

    if (!state.listenersAttached) {
      document.addEventListener("click", handleClick, true);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("focusin", handleFormFocus, true);
      document.addEventListener("visibilitychange", handleVisibility);

      window.addEventListener("beforeunload", () => {
        exitPage(true);
        endSession();
      });

      state.listenersAttached = true;
    }
  },

  trackPageView(pageUrl) {
    enterPage(pageUrl);
  },

  trackFormSubmit(formName, success, metadata = {}) {
    sendEvent(success ? "form_submit" : "form_error", formName, metadata);
  },

  trackCustomEvent(target, metadata = {}) {
    sendEvent("custom", target, metadata);
  },

  setUserId(userId) {
    if (!userId) return;
    state.userId = userId;
    savePortfolioUserId(userId);
  },
};

export default analytics;
