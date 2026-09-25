import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; 
// const BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});


export function beacon(path, data) {
  const url = `${BASE_URL}${path}`;
  const payload = JSON.stringify(data);

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    const ok = navigator.sendBeacon(url, blob);
    if (ok) return;
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

// =============================
// Contact form
export const submitContact = async (formData) => {
  return api.post("/contact", formData);
};

// =============================
// Backend wake-up (Render free tier cold start)
export const wakeUpServer = () => {
  return api.get("/health");
};

// =============================
// Short human-readable visitor userId
export const saveUser = async (browserId) => {
  return api.post("/user", { browserId });
};

// =============================
// Analytics tracking
export const trackSessionStart = (payload) => api.post("/track/session/start", payload);

export const trackSessionEnd = (payload) => beacon("/track/session/end", payload);

export const trackPageEnter = (payload) => api.post("/track/page", payload);

export const trackPageExit = (payload) => beacon("/track/page", payload);

export const trackEvent = (payload) => api.post("/track/event", payload);

// events queued right before unload should also use the beacon path
export const trackEventBeacon = (payload) => beacon("/track/event", payload);

export const trackLocation = (payload) => api.post("/track/location", payload);

export default api;
