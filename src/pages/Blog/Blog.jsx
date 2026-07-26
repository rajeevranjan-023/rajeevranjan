import useDocumentTitle from '../../hooks/useDocumentTitle.js'

const DRAFTS = [
  {
    title: 'Building the water-level control loop',
    blurb: 'A behind-the-scenes look at the sensor feedback logic — coming soon.',
  },
  {
    title: 'REST APIs, the plain-English way',
    blurb: 'Notes from building the weather app — coming soon.',
  },
  {
    title: "What I'm learning in DSA right now",
    blurb: 'Running notes from coursework — coming soon.',
  },
]

export default function Blog() {
  useDocumentTitle('Blog')

  return (
    <>
      <div className="eyebrow reveal">Transmission Log</div>
      <h1 className="reveal">Blog</h1>
      <p className="reveal" style={{ maxWidth: 600 }}>
        Write-ups on builds, what broke, and what I learned fixing it. The layout below is ready
        to receive posts.
      </p>

      <div className="grid-3 reveal" style={{ marginTop: 10 }}>
        {DRAFTS.map((d) => (
          <div className="panel panel-pad" style={{ opacity: 0.55 }} key={d.title}>
            <span className="project-tag">Draft</span>
            <h3 style={{ fontSize: 16, marginTop: 8 }}>{d.title}</h3>
            <p style={{ fontSize: 13.5 }}>{d.blurb}</p>
          </div>
        ))}
      </div>

      <div className="panel reveal empty-state" style={{ marginTop: 26 }}>
        <div className="status-pill">
          <span className="dot"></span>Channel Open
        </div>
        <div className="icon-orb">
          <i className="fa-solid fa-feather-pointed"></i>
        </div>
        <h3>First post hasn't shipped yet.</h3>
        <p>
          These three drafts are placeholders, not real posts — flagged that way on purpose.
          Publish the first one and it replaces a draft card here.
        </p>
      </div>
    </>
  )
}
