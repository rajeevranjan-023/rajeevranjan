// Maps each route path to its topbar label (shown in Header)

export const PAGE_META = {
  '/': { topbar: 'HOME / DASHBOARD', title: 'Home' },
  '/about': { topbar: 'ABOUT / IDENTITY LOG', title: 'About' },
  '/skills': { topbar: 'SKILLS / CAPABILITY MATRIX', title: 'Skills' },
  '/projects': { topbar: 'PROJECTS / BUILD LOG', title: 'Projects' },
  '/experience': { topbar: 'EXPERIENCE / SERVICE RECORD', title: 'Experience' },
  '/education': { topbar: 'EDUCATION / ACADEMIC TIMELINE', title: 'Education' },
  '/certifications': { topbar: 'CERTIFICATIONS / VERIFIED MODULES', title: 'Certifications' },
  '/gallery': { topbar: 'GALLERY / VISUAL ARCHIVE', title: 'Gallery' },
  '/blog': { topbar: 'BLOG / TRANSMISSION LOG', title: 'Blog' },
  '/contact': { topbar: 'CONTACT / OPEN CHANNEL', title: 'Contact' },
}

export const NOT_FOUND_META = { topbar: 'SYSTEM / 404', title: '404 Not Found' }

export function getPageMeta(pathname) {
  return PAGE_META[pathname] || NOT_FOUND_META
}
