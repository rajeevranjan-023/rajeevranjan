import './ViewerStatus.css';

export function DocumentLoading({ label = 'Loading document…' }) {
  return (
    <div className="viewer-status viewer-status-loading">
      <span className="spinner spinner-lg" aria-hidden="true" />
      <p className="viewer-status-text">{label}</p>
    </div>
  );
}

export function DocumentError({ message, onRetry }) {
  return (
    <div className="viewer-status viewer-status-error">
      <span className="viewer-status-icon" aria-hidden="true">!</span>
      <p className="viewer-status-text">{message || 'Something went wrong while loading this PDF.'}</p>
      {onRetry && (
        <button type="button" className="viewer-status-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="page-spinner-overlay" aria-hidden="true">
      <span className="spinner spinner-sm" />
    </div>
  );
}

export function ZoomBadge({ percent, fading }) {
  if (percent == null) return null;
  return (
    <div className={`zoom-badge${fading ? ' zoom-badge-fading' : ''}`}>
      {percent}%
    </div>
  );
}
