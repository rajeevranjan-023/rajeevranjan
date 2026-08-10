import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useTouchGestures } from './useTouchGestures.js';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const documentOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

export default function PdfViewer({
  source,
  status,
  pageNumber,
  scale,
  onLoadSuccess,
  onLoadError,
  onRetry,
  onFlippingChange,
  onNextPage,
  onPrevPage,
  onScaleChange,   // (nextScale: number) => void - commits a pinch-zoom result
  minScale = 0.5,
  maxScale = 3,
  isFlipping,
}) {
  const gesturesDisabled = status !== 'ready' || !!isFlipping;

  const { containerRef, targetRef, pinchTransform, isPinching, livePercent } = useTouchGestures({
    minScale,
    maxScale,
    scale,
    onPinchZoomChange: onScaleChange,
    onSwipeNext: onNextPage,
    onSwipePrev: onPrevPage,
    disabled: gesturesDisabled,
  });

  return (
    <div className="pdf-stage" ref={containerRef}>
      <div className={status === 'ready' ? 'pdf-scene' : 'pdf-scene pdf-scene-hidden'}>
        <Document
          file={source}
          options={documentOptions}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={null}
          error={null}
        >
          <div
            ref={targetRef}
            className={`page-slot page-slot-base${isPinching ? ' page-slot-pinching' : ''}`}
            style={
              pinchTransform
                ? {
                    transform: `scale(${pinchTransform.scale})`,
                    transformOrigin: `${pinchTransform.originX} ${pinchTransform.originY}`,
                  }
                : undefined
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="pdf-page"
              loading={null}
            />
          </div>
        </Document>
      </div>

      {isPinching && livePercent != null && (
        <div className="pinch-zoom-badge" aria-hidden="true">
          {livePercent}%
        </div>
      )}
    </div>
  );
}
