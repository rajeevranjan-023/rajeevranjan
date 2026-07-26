import { memo } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand">
            <Logo className="logo-img" />
            <div className="brand-name">
              RAJEEV RANJAN
              <span className="logo-mark-text">Theme: LIGHT</span>
            </div>
          </div>
          <p className="footer-tagline">
            CSE undergraduate building automation systems and full-stack web apps, one clean
            commit at a time.
          </p>
          <div className="footer-social">
            <a
              className="icon-btn"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              className="icon-btn"
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a className="icon-btn" href="mailto:23.rajeevranjan.23@gmail.com" title="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/education">Education</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Focus Areas</h4>
          <ul className="footer-links">
            <li>Full-Stack Web Dev</li>
            <li>REST APIs</li>
            <li>Embedded Automation</li>
            <li>Data Structures &amp; Algorithms</li>
          </ul>
        </div>

        <div>
          <h4>contact</h4>
          <ul className="footer-links">
            <li><i className="fa-solid fa-envelope"></i>&nbsp; <a href="mailto:23.rajeevranjan.23@gmail.com">23.rajeevranjan.23@gmail.com</a></li>
            <li><i className="fa-solid fa-phone"></i>&nbsp; +91-9155XXXXXX</li>
            <li><i className="fa-solid fa-location-dot"></i>&nbsp; Sagar, Madhya Pradesh, IN</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Rajeev Ranjan. All rights reserved.</span>
        <span className="mono">v1.0.1</span>
      </div>
    </footer>
  )
}

export default memo(Footer)
