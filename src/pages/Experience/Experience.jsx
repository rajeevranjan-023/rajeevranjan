import { Link } from 'react-router-dom'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function Experience() {
  useDocumentTitle('Experience')

  return (
    <>
      <div className="eyebrow reveal">Service Record</div>
      <h1 className="reveal">Experience</h1>
      <p className="reveal" style={{ maxWidth: 600 }}>
        No formal job roles yet — I'm early in my CSE degree. Here's the real-world, hands-on
        work logged so far, with room reserved below for what's next.
      </p>

      <div className="timeline reveal" style={{ marginTop: 26 }}>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-date">January 2026</div>
          <h3>Web Development Internship</h3>
          <div className="org">Techgment</div>
          <p style={{ margin: 0 }}>
            Applied full-stack fundamentals (HTML, CSS, JavaScript, REST APIs) in a guided
            internship setting.
          </p>
          <span className="timeline-badge">Certified</span>
        </div>
      </div>

      <div className="panel reveal empty-state" style={{ marginTop: 30 }}>
        <div className="status-pill">
          <span className="dot"></span>Slot Reserved
        </div>
        <div className="icon-orb">
          <i className="fa-solid fa-briefcase"></i>
        </div>
        <h3>Next role goes here.</h3>
        <p>
          This section is built and ready — internships, freelance work, or a first full-time
          role will slot straight into the timeline above with dates, org name, and
          responsibilities.
        </p>
        <Link to="/contact" className="btn btn-ghost">
          <i className="fa-solid fa-paper-plane"></i> Open to opportunities — get in touch
        </Link>
      </div>
    </>
  )
}
