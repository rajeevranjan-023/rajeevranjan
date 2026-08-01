import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function Certifications() {
  useDocumentTitle('Certifications')

  return (
    <>
      <div className="eyebrow reveal">Verified Modules</div>
      <h1 className="reveal">Certifications &amp; Achievements</h1>

      <div className="grid-2 reveal" style={{ marginTop: 20 }}>
        <div className="panel cert-card">
          <div className="cert-icon">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <h3>AI Skills Passport</h3>
            <div className="org">Microsoft Elevate &amp; EY</div>
            <div className="date">June 2026</div>
          </div>
        </div>
        <div className="panel cert-card">
          <div className="cert-icon">
            <i className="fa-solid fa-laptop-code"></i>
          </div>
          <div>
            <h3>Web Development Internship</h3>
            <div className="org">Techgment</div>
            <div className="date">January 2026</div>
          </div>
        </div>
      </div>

      <div className="section-head reveal">
        <h2>Achievements</h2>
      </div>
      <div className="panel panel-pad reveal">
        <ul className="project-list" style={{ margin: 0 }}>
          <li>Scored 94.0% in CBSE Class X (Cambridge Public School)</li>
          <li>
            Maintaining an 8.96 CGPA through the CSE program at Dr. Hari Singh Gour Central
            University
          </li>
        </ul>
      </div>

      <div className="panel reveal empty-state" style={{ marginTop: 26 }}>
        <div className="status-pill">
          <span className="dot"></span>Udated soon!
        </div>
        <div className="icon-orb">
          <i className="fa-solid fa-certificate"></i>
        </div>
        <h3>More badges incoming.</h3>
      
      </div>
    </>
  )
}
