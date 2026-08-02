export const getLocationData = () => {                      // Main function to collect location data

  return new Promise((resolve, reject) => {                 // Promise because location fetching is asynchronous

    if (!navigator.geolocation) {                           // Check if browser supports Geolocation API
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(               // Ask user for current location
      (position) => {                                       // Runs if user allows permission
        const data = {
          latitude: position.coords.latitude,               // User latitude
          longitude: position.coords.longitude,             // User longitude
          accuracy: position.coords.accuracy,               // Accuracy in meters

          browser: getBrowser(),                            // Browser name
          os: getOS(),                                      // Operating System
          userAgent: navigator.userAgent,                   // Complete User-Agent string

          deviceType: getDeviceType(),                      // Desktop / Mobile / Tablet

          screenWidth: window.screen.width,                 // Screen width
          screenHeight: window.screen.height,               // Screen height

          language: navigator.language,                     // Browser language

          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // User timezone

          permission: "granted",                            // Location permission status
        };
        resolve(data);                                      // Return collected data
      },
      (error) => {                                          // Runs if permission denied or error occurs
        reject(error);
      },
      {
        enableHighAccuracy: true,                           // Request high accuracy GPS
        timeout: 60000,                                     // Wait maximum 10 seconds
        maximumAge: 0,                                      // Always fetch fresh location
      }

    );

  });
};


// =============================
// Browser Detection
// =============================

function getBrowser() {

  const ua = navigator.userAgent;                           // Browser User-Agent string
  if (ua.includes("Edg")) return "Edge";                    // Microsoft Edge
  if (ua.includes("Chrome")) return "Chrome";               // Google Chrome
  if (ua.includes("Firefox")) return "Firefox";             // Mozilla Firefox
  if (ua.includes("Safari")) return "Safari";               // Apple Safari
  return "Unknown";                                         // Unknown browser
}


// =============================
// Operating System Detection

function getOS() {

  const ua = navigator.userAgent;                           // User-Agent string
  if (ua.includes("Windows")) return "Windows";             // Windows OS
  if (ua.includes("Android")) return "Android";             // Android OS
  if (ua.includes("iPhone")) return "iOS";                  // iPhone / iOS
  if (ua.includes("Mac")) return "MacOS";                   // macOS
  if (ua.includes("Linux")) return "Linux";                 // Linux
  return "Unknown";                                         // Unknown OS
}


// =============================
// Device Type Detection

function getDeviceType() {

  const ua = navigator.userAgent;                           // User-Agent string
  if (/Mobi|Android|iPhone/i.test(ua)) {                    // Mobile devices
    return "Mobile";
  }
  if (/Tablet|iPad/i.test(ua)) {                            // Tablet devices
    return "Tablet";
  }
  return "Desktop";                                         // Default device type
}