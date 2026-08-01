import useDocumentTitle from '../../hooks/useDocumentTitle.js'

const DRAFTS = [
  {
    title:"",
    blurb:"",
  },
  {
    title: '',
    blurb: '',
  },
  {
    title: "",
    blurb: '',
  },
]

export default function Blog() {
  useDocumentTitle('Blog')

  return (
    <>
      <div className="eyebrow reveal">Transmission Log</div>
      <h1 className="reveal">Blog</h1>


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
        <h3>updated soon!</h3>
        
      </div>
    </>
  )
}
