export const getLocationData = () => {            
  return new Promise((resolve, reject) => {              

    if (!navigator.geolocation) {                           // Check if browser supports Geolocation API
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(               // Ask user for current location
      (position) => {                                        // Runs if user allows permission
        const data = {
          latitude: position.coords.latitude,               // User latitude
          longitude: position.coords.longitude,             // User longitude
          accuracy: position.coords.accuracy,               // Accuracy in meters

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
