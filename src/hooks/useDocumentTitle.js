import { useEffect } from 'react'

/**
 * Sets document.title, matching the pattern each static page used:
 * "{Page Title} · Rajeev Ranjan"
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · Rajeev Ranjan`
    return () => {
      document.title = previous
    }
  }, [title])
}
