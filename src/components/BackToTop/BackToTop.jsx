import { useCallback, memo } from 'react'

function BackToTop() {
  const scrollToTop = useCallback((e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <a
      href="#top"
      id="back-top"
      className="btn btn-primary"
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </a>
  )
}

export default memo(BackToTop)
