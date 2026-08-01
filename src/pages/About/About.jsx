import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function About() {
  useDocumentTitle('About')

  return (
    <>
      <div className="eyebrow reveal">Identity Log</div>
      <h1 className="reveal">About</h1>

      <div className="grid-2 reveal" style={{ marginTop: 24, alignItems: 'stretch' }}>
        <div className="panel panel-pad">
          <h3>Career Objective</h3>
          <p style={{ textAlign: 'justify' }}>
            Second-year Computer Science & Engineering student at 
            Dr. Hari Singh Gour Central University, focused on DSA 
            in C++, full-stack web development (MERN), and embedded 
            systems. Practical experience includes sensor-based automation 
            projects and responsive web applications, with an emphasis on 
            clean, maintainable, and efficient code. Continuous learning
             through hands-on projects and consistent practice across 
             modern web technologies.

          </p>
        </div>
        <div className="panel panel-pad">
          <h3>About</h3>
          <ul className="project-list" style={{ marginTop: 4 }}>
            <li>Currently pursuing B.Tech in CSE (2025–29), CGPA 8.96/10</li>
            <li>Built an automated water-level control system with 100% hands-off operation</li>
            <li>Shipped a REST-API-powered weather app from scratch</li>
            <li>Experience with Node.js, Express.js, MongoDB, MySQL, and React.</li>
            <li>AI Skills Passport certified (Microsoft Elevate &amp; EY, 2026)</li>
          </ul>
        </div>
      </div>

      <div className="section-head reveal">
        <h2>Development Approach</h2>
      </div>
      <div className="grid-3">
        <div className="panel panel-pad reveal">
          <i className="fa-solid fa-gears" style={{ color: 'var(--accent-2)', fontSize: 20 }}></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Problem Solving</h3>
          <p style={{ fontSize: 14 }}>
           Breaking complex problems into smaller, manageable tasks before implementation.
          </p>
        </div>
        <div className="panel panel-pad reveal">
          <i className="fa-solid fa-code" style={{ color: 'var(--accent-2)', fontSize: 20 }}></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Strong Fundamentals</h3>
          <p style={{ fontSize: 14 }}>
           Focus on core Computer Science concepts, C/C++, and Data Structures & Algorithms..
          </p>
        </div>
        <div className="panel panel-pad reveal">
          <i
            className="fa-solid fa-arrows-rotate"
            style={{ color: 'var(--accent-2)', fontSize: 20 }}
          ></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Continuous Improvement</h3>
          <p style={{ fontSize: 14 }}>
            Solutions are refined through testing, iteration, and performance improvements.
          </p>
        </div>
      </div>
    </>
  )
}
