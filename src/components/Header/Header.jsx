import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import { getPageMeta } from '../../utils/pageTitles.js'

export default function Header() {
  const location = useLocation()
  const { toggleTheme, themeIconClass } = useTheme()
  const { topbar } = getPageMeta(location.pathname)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <label htmlFor="nav-toggle" className="icon-btn menu-toggle" aria-label="Open menu">
          <i className="fa-solid fa-bars"></i>
        </label>
        <span className="topbar-title">{topbar}</span>
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Search" title="Search (visual only)">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button
          className="icon-btn theme-toggle"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          <i className={themeIconClass}></i>
        </button>
        <a className="btn btn-ghost" href="/Rajeev_Ranjan_Resume.pdf" download>
          <i className="fa-solid fa-download"></i> Resume
        </a>
      </div>
    </header>
  )
}
