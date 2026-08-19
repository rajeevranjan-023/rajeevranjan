import useDocumentTitle from '../../hooks/useDocumentTitle.js'
import { useNavigate } from "react-router-dom";


export default function Projects() {
  useDocumentTitle('Projects')
  const navigate = useNavigate();

  return (
    <>
      <div className="eyebrow reveal">Build Log</div>
      <h1 className="reveal">Projects</h1>

      <div className="grid-2 reveal" style={{ marginTop: 20 }}>
        <div  onClick={() => navigate("/projects/water-tank")} className="panel project-card">
          <span className="project-tag">Electromechanical Systems · May – Jul 2025</span>
          <h3>Smart Water Level Monitoring &amp; Control System</h3>
          <p> 
            Designed an electromechanical closed-loop control system for automated water level
            regulation, using sensor-based feedback for real-time monitoring and correction.
          </p>
          <ul className="project-list">
            <li>Achieved 100% automation in maintaining predefined water levels</li>
            <li>Sensor-driven feedback loop removes the need for manual checks</li>
            <li>Optimized the system afterwards to improve overall water-management efficiency</li>
          </ul>
          <div className="project-meta">
            <span className="tech-pill">Sensors</span>
            <span className="tech-pill">Closed-loop Control</span>
            <span className="tech-pill">Automation</span>
          </div>
        </div>

        <div onClick={() => navigate("/projects/gps-trac")} className="panel project-card">
          <span className="project-tag">Web App · January 2026</span>
          <h3>Weather Application (REST API)</h3>
          <p>
            A responsive web app that pulls real-time weather data for any location a user types
            in, built entirely with vanilla front-end tools plus a public weather REST API.
          </p>
          <ul className="project-list">
            <li>Live weather lookup by user-entered location</li>
            <li>Dynamic, responsive interface built with HTML, CSS &amp; JavaScript</li>
            <li>Clean REST API integration and response handling</li>
          </ul>
          <div className="project-meta">
            <span className="tech-pill">HTML</span>
            <span className="tech-pill">CSS</span>
            <span className="tech-pill">JavaScript</span>
            <span className="tech-pill">REST API</span>
          </div>
        </div>
      </div>

      <div className="panel panel-pad reveal" style={{ marginTop: 26 }}>
        <h3 style={{ fontSize: 16 }}>
          <i className="fa-solid fa-flask" style={{ color: 'var(--accent-2)' }}></i> More builds
          in the lab
        </h3>
        <p style={{ margin: 0 }}>
          Both projects above are shipped and working. This page grows as new builds — mostly
          full-stack apps and further automation experiments — are completed.
        </p>
      </div>
    </>
  )
}
