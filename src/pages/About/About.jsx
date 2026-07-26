import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function About() {
  useDocumentTitle('About')

  return (
    <>
      <div className="eyebrow reveal">Identity Log</div>
      <h1 className="reveal">About Me</h1>

      <div className="grid-2 reveal" style={{ marginTop: 24, alignItems: 'stretch' }}>
        <div className="panel panel-pad">
          <h3>Career Objective</h3>
          <p>
            Second-year Computer Science &amp; Engineering student at Dr. Hari Singh Gour Central
            University, with hands-on experience across embedded automation and full-stack web
            development. I enjoy taking a system — mechanical or digital — and making it run
            without hand-holding: sensors that regulate themselves, APIs that fetch and render
            data cleanly, code that's built to be read again later. Looking to grow as a
            full-stack developer while sharpening my data structures &amp; algorithms
            fundamentals.
          </p>
        </div>
        <div className="panel panel-pad">
          <h3>Quick Facts</h3>
          <ul className="project-list" style={{ marginTop: 4 }}>
            <li>Currently pursuing B.Tech in CSE (2025–29), CGPA 8.96/10</li>
            <li>Built an automated water-level control system with 100% hands-off operation</li>
            <li>Shipped a REST-API-powered weather app from scratch</li>
            <li>Comfortable across the MERN-adjacent stack: Node.js, Express, MongoDB, MySQL</li>
            <li>AI Skills Passport certified (Microsoft Elevate &amp; EY, 2026)</li>
          </ul>
        </div>
      </div>

      <div className="section-head reveal">
        <h2>How I work</h2>
      </div>
      <div className="grid-3">
        <div className="panel panel-pad reveal">
          <i className="fa-solid fa-gears" style={{ color: 'var(--accent-2)', fontSize: 20 }}></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Systems-first</h3>
          <p style={{ fontSize: 14 }}>
            I think in feedback loops — whether it's a water sensor or an API response, I want it
            self-correcting.
          </p>
        </div>
        <div className="panel panel-pad reveal">
          <i className="fa-solid fa-code" style={{ color: 'var(--accent-2)', fontSize: 20 }}></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Clean fundamentals</h3>
          <p style={{ fontSize: 14 }}>
            Strong grounding in C/C++ and DSA before reaching for frameworks — I want to know
            what's underneath.
          </p>
        </div>
        <div className="panel panel-pad reveal">
          <i
            className="fa-solid fa-arrows-rotate"
            style={{ color: 'var(--accent-2)', fontSize: 20 }}
          ></i>
          <h3 style={{ marginTop: 12, fontSize: 16 }}>Iterative builder</h3>
          <p style={{ fontSize: 14 }}>
            Ship a working version, then optimize — the water-level project's efficiency pass is
            a good example.
          </p>
        </div>
      </div>
    </>
  )
}
