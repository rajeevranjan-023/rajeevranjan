import PageControls from './PageControls.jsx';
import ZoomControls from './ZoomControls.jsx';
import './Toolbar.css';
import Logo from '../../../components/Logo/Logo.jsx'

export default function Toolbar({
  label, 
  status,
  pageNumber,
  numPages,
  onPrevPage,
  onNextPage,
  isFlipping,
  scale,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  minScale,
  maxScale,
}) {
  return (
    <header className="toolbar">
      <div className="toolbar-row toolbar-row-main">
        

        <span className="doc-label" title={label}>
          {label}
        </span>

        <div className="toolbar-spacer" />

        {status === 'ready' && (
          <>
            <PageControls
              pageNumber={pageNumber}
              numPages={numPages}
              onPrevPage={onPrevPage}
              onNextPage={onNextPage}
              isFlipping={isFlipping}
            />
            <ZoomControls
              scale={scale}
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              onZoomReset={onZoomReset}
              minScale={minScale}
              maxScale={maxScale}
            />
          </>
        )}
      </div>
    </header>
  );
}
