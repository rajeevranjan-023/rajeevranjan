import { Link } from 'react-router-dom'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('404 Not Found')

  return (
    <div className="error-wrap reveal">
      <div className="error-code">404</div>
      <h2>Route not found in this system.</h2>
      <p style={{ maxWidth: 420, margin: '0 auto 24px' }}>
        The page you're looking for drifted out of orbit. Let's get you back to a known location.
      </p>
      <Link to="/" className="btn btn-primary">
        <i className="fa-solid fa-house"></i> Return to Dashboard
      </Link>
    </div>
  )
}
