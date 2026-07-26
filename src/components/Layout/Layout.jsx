import { useState, useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Background from '../Background/Background.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import BackToTop from '../BackToTop/BackToTop.jsx'


export default function Layout() {
  const location = useLocation()

  // Sidebar open/closed state — replaces the pure-CSS checkbox hack
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = useCallback(() => {
    setNavOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  return (
    <>
      <a id="top"></a>
      <Background />

      {/* pure-CSS mobile/desktop nav toggle (checkbox hack), now controlled by React state */}
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle-input"
        checked={navOpen}
        onChange={toggleNav}
      />
      <label htmlFor="nav-toggle" className="mobile-nav-backdrop"></label>

      <div className="app-shell">
        <Sidebar />

        <div className="main-col">
          <Header />

          <main className="content">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>

      <BackToTop />
    </>
  )
}
