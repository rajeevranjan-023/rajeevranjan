import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function Education() {
  useDocumentTitle('Education')

  return (
    <>
      <h1 className="reveal">Education</h1>

      <div className="panel panel-pad reveal" style={{ marginTop: 20 }}>
        <div className="timeline">
          <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2025 — 2029</div>
              <h3>B.Tech, Computer Science &amp; Engineering</h3>
              <div className="org"><a href='https://dhsgsu.edu.in/index.php/en/'>Dr. Hari Singh Gour Central University</a></div>
              <p style={{ margin: 0 }}>
                Currently pursuing an undergraduate degree in Computer Science &amp; Engineering.
              </p>
              <span className="timeline-badge">CGPA: 8.96 / 10</span>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2025</div>
            <h3>Class XII</h3>
            <div className="org"><a href='https://www.nios.ac.in/'>National Institute of Open Schooling (NIOS) </a></div>
            <p style={{ margin: 0 }}>Completed senior secondary education.</p>
            <span className="timeline-badge">76.2%</span>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2022</div>
            <h3>Class X</h3>
            <div className="org"><a href='https://www.cambridgepublicschool.co.in/'>Cambridge Public School (CBSE)</a></div>
            <p style={{ margin: 0 }}>Completed secondary education.</p>
            <span className="timeline-badge">94.0%</span>
          </div>
        </div>
      </div>
    </>
  )
}
