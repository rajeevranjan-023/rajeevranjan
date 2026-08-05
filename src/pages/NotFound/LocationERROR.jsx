import "./LocationERROR.css"
import { useState } from "react";

export default function LocationERROR() {
    const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="error-wrap reveal loader">
             <div className="spinner"></div>
        <div className="error-code">403</div>
        <h2>PERMISSION Required!</h2>
        {/* <p style={{ maxWidth: 420, margin: '0 auto 24px' }}>
          permssions helps us provide the best experience. 
          Please enable location access to continue and then refresh the page.
        </p> */}
        
        <div className="errorAction">
            <button
             className="location-btn"
             onClick={() => window.location.reload()}
            >
            🔄 Refresh
            </button>
            <button
                className="location-btn"
                onClick={() => {
                   setShowSteps(!showSteps);
                   timer = setTimeout(() => {
                     setShowSteps(false);
                   }, 5000);
                }}
            >
            ❓How 
            </button>
        </div>
            {showSteps && (
                <div className="stepsBox">
                  <h3>Enable Location</h3>
                  <ol>
                    <li>Open your browser <b>Settings</b>.</li>
                    <li>Open <b>Site Settings</b>.</li>
                    <li>Search for <b>"Site settings"</b> and open it.</li>
                    <li>go to <b>location</b>, select site, and change permission.</li>
                    <li>Return to this page.</li>
                    <li>Click <b>Refresh</b>.</li>
                  </ol>
                </div>
            )}
       
    </div>
  )
}