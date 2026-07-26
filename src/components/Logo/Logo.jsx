import { useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'

const FALLBACK_SVG =
  "data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%232f6fed%22/%3E%3Ctext x=%2250%22 y=%2263%22 font-size=%2238%22 fill=%22white%22 font-family=%22Arial%22 font-weight=%22bold%22 text-anchor=%22middle%22%3ERR%3C/text%3E%3C/svg%3E"

export default function Logo({ className }) {
  const { logoSrc } = useTheme()

  const handleError = useCallback((e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = FALLBACK_SVG
  }, [])

  return (
    <img
      src={logoSrc}
      alt="Rajeev Ranjan logo"
      className={className}
      data-logo
      onError={handleError}
    />
  )
}
