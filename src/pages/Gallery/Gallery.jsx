import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function Gallery() {
  useDocumentTitle('Gallery')

  return (
    <>
      <div className="eyebrow reveal">Visual Archive</div>
      <h1 className="reveal">Gallery</h1>
      <p className="reveal" style={{ maxWidth: 600 }}>
        Screenshots, circuit shots, and demo clips of the builds above will live here. The frame
        is wired up and ready — just drop images in <span className="mono">/images/gallery/</span>{' '}
        and swap them into the slots below.
      </p>

      <div className="section-head reveal">
        <h2>Reserved slots</h2>
      </div>
      <div className="slot-grid reveal">
        <div className="slot-card">
          <i className="fa-solid fa-image"></i>
          <span>Water-level rig photo</span>
        </div>
        <div className="slot-card">
          <i className="fa-solid fa-image"></i>
          <span>Weather app screenshot</span>
        </div>
        <div className="slot-card">
          <i className="fa-solid fa-image"></i>
          <span>Circuit / wiring diagram</span>
        </div>
        <div className="slot-card">
          <i className="fa-solid fa-image"></i>
          <span>Campus / cert photo</span>
        </div>
        <div className="slot-card">
          <i className="fa-solid fa-image"></i>
          <span>Demo clip / GIF</span>
        </div>
        <div className="slot-card">
          <i className="fa-solid fa-plus"></i>
          <span>Add new</span>
        </div>
      </div>

      <div className="panel reveal empty-state" style={{ marginTop: 30 }}>
        <div className="status-pill">
          <span className="dot"></span>Awaiting Upload
        </div>
        <div className="icon-orb">
          <i className="fa-solid fa-camera-retro"></i>
        </div>
        <h3>No images yet — that's fine.</h3>
        <p>
          Nothing's been faked here. Once you have real project photos or screenshots, they slot
          straight into this grid.
        </p>
      </div>
    </>
  )
}
