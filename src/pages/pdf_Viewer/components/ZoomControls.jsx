import './Controls.css';

export default function ZoomControls({ scale, onZoomIn, onZoomOut, onZoomReset, minScale, maxScale }) {
  return (
    <div className="control-group" role="group" aria-label="Zoom controls">
      <button
        type="button"
        className="control-btn" 
        onClick={onZoomOut}
        disabled={scale <= minScale}
        aria-label="Zoom out"
      > &#8722;
      </button>



      <button
        type="button"
        className="control-readout control-readout-btn"
        onClick={onZoomReset}
        title="Reset zoom"
      >{Math.round(scale * 100)}%
      </button>



      <button
        type="button"
        className="control-btn"
        onClick={onZoomIn}
        disabled={scale >= maxScale}
        aria-label="Zoom in"
      >&#43;
      </button>


      
    </div>
  );
}
