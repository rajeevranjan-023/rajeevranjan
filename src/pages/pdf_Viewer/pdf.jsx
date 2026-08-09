import { useState, useEffect } from 'react';
import Toolbar from './components/Toolbar.jsx';
import PdfViewer from './components/PdfViewer.jsx';
import './pdf.css';

import { useLocation } from "react-router-dom";


const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.2;

export default function PdfPage({}) {
  const location = useLocation();

  
  const pdfUrl = location.state?.pdfUrl;
  const title = location.state?.title;


  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);

  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('');
  const [isFlipping, setIsFlipping] = useState(false); // true while a page-turn animation is playing
  const [reloadKey, setReloadKey] = useState(0); // bump to force <Document> to retry

  const handleDocumentLoadSuccess = ({ numPages: total }) => {
    setNumPages(total);
    setPageNumber(1);
    setStatus('ready');
  };

  const handleDocumentLoadError = (err) => {
    setStatus('error');
    setErrorMessage(err.message || "Failed to load PDF");
  };

  const handleRetry = () => {
    setStatus('loading');
    setErrorMessage('');
    setReloadKey((k) => k + 1);
  };


  const goPrevPage = () => {
    if (isFlipping) return;
    setPageNumber((p) => Math.max(1, p - 1));
  };
  const goNextPage = () => {
    if (isFlipping) return;
    setPageNumber((p) => Math.min(numPages || p, p + 1));
  };

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, +(s + SCALE_STEP).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, +(s - SCALE_STEP).toFixed(2)));
  const zoomReset = () => setScale(1.1);

  // Keyboard navigation: arrow keys move between pages once the document is loaded.
  useEffect(() => {
    if (status !== 'ready') return;
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNextPage();
      if (e.key === 'ArrowLeft') goPrevPage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, numPages, isFlipping]);

  return (
    <div className="app-shell">
      <Toolbar
        label={title}
        status={status}
        pageNumber={pageNumber}
        numPages={numPages}
        onPrevPage={goPrevPage}
        onNextPage={goNextPage}
        isFlipping={isFlipping}
        scale={scale}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onZoomReset={zoomReset}
        minScale={MIN_SCALE}
        maxScale={MAX_SCALE}
      />

      <main className="viewer-stage">
        <PdfViewer
          key={reloadKey}
          source={pdfUrl}
          status={status}
          errorMessage={errorMessage}
          pageNumber={pageNumber}
          scale={scale}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={handleDocumentLoadError}
          onRetry={handleRetry}
          onFlippingChange={setIsFlipping}
        />
      </main>
    </div>
  );
}

