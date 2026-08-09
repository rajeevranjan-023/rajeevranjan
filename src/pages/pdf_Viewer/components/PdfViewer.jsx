import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const documentOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  cMapPacked: true,
};

const FLIP_DURATION_MS = 1000;

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export default function PdfViewer({
  source,
  status,
  pageNumber,
  scale,
  onLoadSuccess,
  onLoadError,
  onRetry,
  onFlippingChange,
}) {
  const [flip, setFlip] = useState(null); 
  const [flipActive, setFlipActive] = useState(false);
  const prevPageRef = useRef(pageNumber);
  const flipTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const previous = prevPageRef.current;
    prevPageRef.current = pageNumber;

    if (status !== 'ready' || previous == null || previous === pageNumber) return;
    if (prefersReducedMotion) return; 

    const direction = pageNumber > previous ? 'next' : 'prev';

    clearTimeout(flipTimeoutRef.current);
    cancelAnimationFrame(rafRef.current);
    setFlipActive(false);
    setFlip({ from: previous, direction });

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => setFlipActive(true));
    });

    flipTimeoutRef.current = setTimeout(() => {
      setFlip(null);
      setFlipActive(false);
    }, FLIP_DURATION_MS);

    return () => {
      clearTimeout(flipTimeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pageNumber, status]);

  useEffect(() => {
    onFlippingChange?.(!!flip);
  }, [flip, onFlippingChange]);




  return (
    <div className="pdf-stage">
      <div className={status === 'ready' ? 'pdf-scene' : 'pdf-scene pdf-scene-hidden'}>
        <Document
          file={source}
          options={documentOptions}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={null}
          error={null}
        >
          <div className="page-slot page-slot-base">
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="pdf-page"
              loading={null}
            />
          </div>

          {flip && (
            <div
              className={[
                'page-slot',
                'page-slot-flip',
                `flip-${flip.direction}`,
                flipActive ? 'flip-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              <Page
                pageNumber={flip.from}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="pdf-page pdf-page-flip"
                loading={null}
              />
              <span className="flip-shade" />
              <span className="flip-edge" />
            </div>
          )}
        </Document>
      </div>
    </div>
  );
}
