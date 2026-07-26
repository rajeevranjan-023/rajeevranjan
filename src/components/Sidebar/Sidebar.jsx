import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

const NAV_ITEMS = [
  { to: '/', icon: 'fa-house', label: 'Home', end: true },
  { to: '/about', icon: 'fa-user-astronaut', label: 'About' },
  { to: '/skills', icon: 'fa-microchip', label: 'Skills' },
  { to: '/projects', icon: 'fa-diagram-project', label: 'Projects' },
  { to: '/experience', icon: 'fa-briefcase', label: 'Experience' },
  { to: '/education', icon: 'fa-graduation-cap', label: 'Education' },
  { to: '/certifications', icon: 'fa-certificate', label: 'Certifications' },
  { to: '/gallery', icon: 'fa-images', label: 'Gallery' },
  { to: '/blog', icon: 'fa-feather-pointed', label: 'Blog' },
  { to: '/contact', icon: 'fa-satellite-dish', label: 'Contact' },
]

export default function Sidebar() {
  const { logoLabel } = useTheme()

  return (
    <nav className="sidenav">
      <NavLink to="/" className="brand">
        <Logo className="logo-img" />
        <div className="brand-name">
          RAJEEV RANJAN
          <span className="logo-mark-text">{logoLabel}</span>
        </div>
      </NavLink>

      <ul className="nav-links">
        {NAV_ITEMS.map(({ to, icon, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>
              <i className={`fa-solid ${icon}`}></i> {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="side-status mono">
        <br />
        CGPA: 8.96 / 10
        <br />
        STACK: MERN-ready
        <br />
        LOC: Sagar, MP, IN
      </div>
    </nav>
  )
}
