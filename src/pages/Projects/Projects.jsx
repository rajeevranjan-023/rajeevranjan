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
        <div  onClick={() => navigate("/projects/a7f3k9x2qz")} className="panel project-card">
          <span className="project-tag">Electromechanical Systems · May – Jul 2025</span>
          <h3>Smart Water Level Monitoring &amp; Control System</h3>
          <p> 
            Designed an electromechanical closed-loop control system for automated water level
            regulation, using sensor-based feedback for real-time monitoring and correction.
          </p>

          <div className="project-meta">
            <span className="tech-pill">Sensors</span>
            <span className="tech-pill">Closed-loop Control</span>
            <span className="tech-pill">Automation</span>
            <span className="tech-pill">v2. C++</span>
          </div>
        </div>

        {/* =========================================================================================== */}

        <div onClick={() => navigate("/projects/b4x9m2t7qk")} className="panel project-card">
          <span className="project-tag">Web App · January 2026</span>
          <h3>Weather Application (REST API)</h3>
          <p>
            A responsive web app that pulls real-time weather data for any location a user types
            in, built entirely with vanilla front-end tools plus a public weather REST API.
          </p>

          <div className="project-meta">
            <span className="tech-pill">HTML</span>
            <span className="tech-pill">CSS</span>
            <span className="tech-pill">JavaScript</span>
            <span className="tech-pill">REST API</span>
          </div>
        </div>
        
        {/* =========================================================================================== */}
        <div onClick={() => navigate("/projects/c2f9a6t3wz")} className="panel project-card">
          <span className="project-tag">PORTFOLIO SITE · JULY 2026</span>
          <h3>Portfolio site (Rajeev Ranjan)</h3>
          <p>
            A full-stack portfolio platform demonstrating my work in web
            development, system design, and practical project implementation 
            with a focus on clean UI and performance.
          </p>

          <div className="project-meta">
            <span className="tech-pill">HTML</span>
            <span className="tech-pill">CSS</span>
            <span className="tech-pill">JavaScript</span>
            <span className="tech-pill">REST API</span>
            <span className="tech-pill">MongoDB Atlas</span>
            <span className="tech-pill">React.js</span>
            <span className="tech-pill">Node.js</span>
            <span className="tech-pill">Express.js</span>
            <span className="tech-pill">Tailwind css</span>
          </div>
        </div>
        {/* =========================================================================================== */}
        <div onClick={() => navigate("/projects/d7n4c8v2jb")} className="panel project-card">
          <span className="project-tag">------- · AUGUST 2026</span>
          <h3>-------------------</h3>
          <p>
Project in <b>progess</b>..... soon updated here...
          </p>

          <div className="project-meta">
            <span className="tech-pill">HTML</span>
            <span className="tech-pill">CSS</span>
            <span className="tech-pill">JavaScript</span>
            <span className="tech-pill">REST API</span>
            <span className="tech-pill">MongoDB Atlas</span>
            <span className="tech-pill">React.js</span>
            <span className="tech-pill">Node.js</span>
            <span className="tech-pill">Express.js</span>
            <span className="tech-pill">Tailwind css</span>
            <span className="tech-pill">ESP32 module</span>
            <span className="tech-pill">C++</span>
            <span className="tech-pill">sensor and automations</span>
          </div>
        </div>
        {/* =========================================================================================== */}


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
