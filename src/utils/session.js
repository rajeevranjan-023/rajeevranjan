import Cookies from "js-cookie";

export function getAnonymousId() {
  let id = Cookies.get("anonymousId");
  if (!id) {
    id = crypto.randomUUID();
    Cookies.set("anonymousId", id, { expires: 365, sameSite: "Lax", path: "/" });
  }
  return id;
}

export function getSessionId() {
  let id = sessionStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("sessionId", id);
  }
  return id;
}

export function isNewSession() {
  return sessionStorage.getItem("__session_started") !== "true";
}

export function markSessionStarted() {
  sessionStorage.setItem("__session_started", "true");
}
