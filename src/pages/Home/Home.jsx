import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo.jsx'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function Home() {
  useDocumentTitle('Home')

  return (
    <>
      <section className="hero reveal">
        <div>
          <div className="hero-eyebrow">// SYSTEM BOOT · PORTFOLIO OS v1.0</div>
          <h1>
            Hi, I'm <em>Rajeev Ranjan</em>
            <br />
            building things that run themselves.
          </h1>
          <p className="lead">
            CSE undergraduate at Dr. Hari Singh Gour Central University, focused on full-stack
            web development and real-world automation. Currently:<br></br>{' '}
            <span className="typed-role">Full-Stack Developer</span>
          </p>
{/*______________________________________________________________________________________ */}
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">
              <i className="fa-solid fa-diagram-project"></i> View Projects
            </Link>
            <a className="btn btn-ghost" href="/Rajeev_Ranjan_Resume.pdf" download>
              <i className="fa-solid fa-download"></i> Download Resume
            </a>
          </div>
        </div>
{/*______________________________________________________________________________________ */}

        <div className="bot-core">
          <div className="bot-ring r1">
            <div className="orbit-dot"></div>
          </div>
          <div className="bot-ring r2"></div>
          <div className="bot-ring r3"></div>
          <div className="bot-core-inner">
            <Logo className="bot-core-logo" />
          </div>
        </div>
      </section>
{/*______________________________________________________________________________________ */}

      <div className="stat-strip reveal">
        <div className="panel stat-box">
          <div className="stat-num">8.96</div>
          <div className="stat-label">CGPA / 10</div>
        </div>
        <div className="panel stat-box">
          <div className="stat-num">2</div>
          <div className="stat-label">Projects Shipped</div>
        </div>
        <div className="panel stat-box">
          <div className="stat-num">12</div>
          <div className="stat-label">Core Technologies</div>
        </div>
        <div className="panel stat-box">
          <div className="stat-num">2</div>
          <div className="stat-label">Certifications</div>
        </div>
      </div>
{/*______________________________________________________________________________________ */}
      <div className="section-head reveal">
        <h2>Explore the console</h2>
      </div>

      <div className="grid-4">
        <Link to="/about" className="panel quick-card reveal">
          <i className="fa-solid fa-user-astronaut"></i>
          <h3>About</h3>
          <p>Objective, background &amp; how I work.</p>
        </Link>
        <Link to="/skills" className="panel quick-card reveal">
          <i className="fa-solid fa-microchip"></i>
          <h3>Skills</h3>
          <p>Languages, stack &amp; tools I use daily.</p>
        </Link>
        <Link to="/projects" className="panel quick-card reveal">
          <i className="fa-solid fa-diagram-project"></i>
          <h3>Projects</h3>
          <p>Automation &amp; web builds, in detail.</p>
        </Link>
        <Link to="/education" className="panel quick-card reveal">
          <i className="fa-solid fa-graduation-cap"></i>
          <h3>Education</h3>
          <p>Academic timeline from Class X onward.</p>
        </Link>
      </div>
{/*______________________________________________________________________________________ */}
      <div className="section-head reveal">
        <h2>Featured build</h2>
        <Link to="/projects" className="btn btn-ghost">
          All projects <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      
      <div className="panel panel-pad reveal">
        <span className="project-tag">Electromechanical Systems · May–Jul 2025</span>
        <h3>Smart Water Level Monitoring &amp; Control System</h3>
        <p>
          A closed-loop control system that regulates water level automatically using real-time
          sensor feedback — no manual intervention required.
        </p>
        <div className="project-meta">
          <span className="tech-pill">Sensors</span>
          <span className="tech-pill">Feedback Control</span>
          <span className="tech-pill">Automation</span>
        </div>
      </div>
    </>
  )
}
