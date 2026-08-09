import './Controls.css';

export default function PageControls({ pageNumber, numPages, onPrevPage, onNextPage, isFlipping }) {
  return ( 
    <div className="control-group" role="group" aria-label="Page navigation">
      <button
        type="button"
        className="control-btn"
        onClick={onPrevPage}
        disabled={pageNumber <= 1 || isFlipping}
        aria-label="Previous page"
      >    &#8592;                               {/*      &#8592; ←   (left arrow) */}
      </button>



      <span className="control-readout">
        {String(pageNumber).padStart(2, '0')}
        <span className="control-readout-sep">/</span>
        {numPages ? String(numPages).padStart(2, '0') : '--'}
      </span>


      
      <button
        type="button"
        className="control-btn"
        onClick={onNextPage}
        disabled={!numPages || pageNumber >= numPages || isFlipping}
        aria-label="Next page"
      >&#8594;
      </button>


    </div>
  );
}
