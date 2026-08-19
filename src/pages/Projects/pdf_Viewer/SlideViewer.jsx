import { useLocation, useNavigate } from "react-router-dom";
import "./SlideViewer.css";

export default function PDFViewer() {
  const location = useLocation();
  const navigate = useNavigate();

  const { pdfUrl, title } = location.state || {}; 

  if (!pdfUrl) {
    return (
      <div className="pdf-page">
        <div className="pdf-error">
          <h2>PDF Not Found</h2>

          <button onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-page">

      {/* PDF HEADER */}
      <div className="pdf-header">

        <button
          className="pdf-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>{title}</h1>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pdf-open-btn"
        >
          Open PDF ↗
        </a>

      </div>

      {/* PDF VIEWER */}
      <div className="pdf-frame-wrapper">

        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title={title}
          className="pdf-frame"
        />

      </div>

    </div>
  );
}