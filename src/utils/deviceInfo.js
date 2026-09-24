export function getDeviceInfo() {
  const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
  const language = navigator.language || "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const networkType = connection?.effectiveType || "";

  return { screenResolution, language, timezone, networkType };
}

export async function getIpLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("ip lookup failed");
    const data = await res.json();
    return {
      country: data.country_name || "",
      state: data.region || "",
      city: data.city || "",
    };
  } catch {
    return { country: "", state: "", city: "" };
  }
}

export function getGpsLocation({ timeout = 8000 } = {}) {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: null, lng: null, accuracy: null, permission: "denied" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          permission: "granted",
        });
      },
      () => {
        resolve({ lat: null, lng: null, accuracy: null, permission: "denied" });
      },
      { enableHighAccuracy: true, timeout, maximumAge: 0 }
    );
  });
}
