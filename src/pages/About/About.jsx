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
            <b> Dr. Hari Singh Gour Central University</b>, focused on DSA 
            in <i> C++</i>, full-stack web development (<i>MERN</i>), and embedded 
            systems. Practical experience includes sensor-based automation 
            projects and responsive web applications with integrated Artificial Intelligence,
             with an emphasis on 
            clean, maintainable, and efficient code. Continuous learning
             through hands-on projects and consistent practice across 
             modern web technologies.

          </p>
        </div>
        <div className="panel panel-pad">
          <h3>About</h3>
          <ul className="project-list" style={{ marginTop: 4 }}>
            <li>B.Tech Computer Science & Engineering student (2025–29), CGPA 8.96/10</li>
            <li>Full Stack Developer skilled in building scalable web applications using React, Node.js, Express, and MongoDB</li>
            <li>Strong foundation in Data Structures & Algorithms with focus on problem-solving and system design</li>
            <li>Hands-on experience in real-world projects including automation systems and location-based platforms</li>
          </ul>
        </div>
      </div>

      <div className="section-head reveal">
        <h2>Development Approach</h2>
      </div>
      <div className="grid-3">
        <div className="panel panel-pad reveal">
          <i className="fa-solid fa-gears" style={{ color: 'var(--accent-2)', fontSize: 20 }}></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Building Real Systems</h3>
          <p style={{ fontSize: 14 }}>
            Focus on creating systems that work reliably in real environments,
            not just controlled demos.
          </p>
        </div>
        <div className="panel panel-pad reveal">
          <i className="fa-solid fa-code" style={{ color: 'var(--accent-2)', fontSize: 20 }}></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Strong Fundamentals</h3>
          <p style={{ fontSize: 14 }}>
           Emphasis on clear logic, core computer science concepts,
           and maintainable architecture.
          </p>
        </div>
        <div className="panel panel-pad reveal">
          <i
            className="fa-solid fa-arrows-rotate"
            style={{ color: 'var(--accent-2)', fontSize: 20 }}
          ></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Continuous Refinemen</h3>
          <p style={{ fontSize: 14 }}>
            Systems are improved through testing, iteration,
            and performance optimization over time.
          </p>
        </div>
      </div>
    </>
  )
}
