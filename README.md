# Rajeev Ranjan — Portfolio (React + Vite)

A pixel-for-pixel React conversion of the original static HTML/CSS/JS
portfolio. All 14 original CSS files are reused as-is — no design,
layout, color, spacing, or animation changes.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a
production build in `dist/`.

## What changed vs. the static site (architecture only)

| Static site | React version |
|---|---|
| 11 separate `.html` files | 1 SPA, routed with `react-router-dom` |
| `theme.js` (DOM queries) | `context/ThemeContext.jsx` (`useState`/`useEffect`/`useCallback`/`useMemo`) |

| Repeated header/footer/sidebar HTML on every page | `components/Layout/Layout.jsx` renders them once, with `<Outlet />` for page content |
| `<title>` per HTML file | `hooks/useDocumentTitle.js`, called by each page |
| Back-to-top `<a href="#top">` | Same link, now calls `window.scrollTo` via `useCallback` (avoids clashing with router URLs) |

Every class name, every CSS file, and every animation/keyframe is
identical to the original. No visual differences are intended.

## Important: CSS fixes applied before conversion

The uploaded project's CSS had drifted from the last known-working
version (likely from an earlier automated "optimization" pass). Before
converting to React, these were restored so the site actually renders
correctly instead of carrying the bugs forward:

1. **`utilities.css` was empty.** Its content (`.eyebrow` label,
   `.reveal` fade-in animation) had been moved into a `components.css`
   file that no page actually linked. Restored into `utilities.css`
   (the file every page does link) and removed the orphaned file.
2. **`variables.css` was missing 5 custom properties** that
   `footer.css`/`header.css` referenced (`--container-max`,
   `--floating-gap`, `--back-top-size`, `--fab-size`, `--z-header`).
   Added with the same values the working site used.
3. **`pages.css` was missing most of its rules** — timeline (Education/
   Experience), skill-grid layout, project cards, cert cards, the
   contact form, empty-state text, gallery slots, and the 404 page
   styling. All restored at the bottom of the file.
4. **`background.css`** only had one generic `.orb` rule, but the HTML
   renders three separate elements (`.orb-a`/`.orb-b`/`.orb-c`) meant
   to float in different corners. Restored the three position/timing
   variants, and restored the grid's vignette `mask-image`.

Nothing else was touched — every other file matched the working site
already and was copied over unchanged.

## Folder structure

```
src/
  components/   Layout, Sidebar, Header, Footer, Loader, Background,
                BackToTop, BotAssistant, Logo (all reusable UI)
  pages/        One folder per route (Home, About, Skills, Projects,
                Experience, Education, Certifications, Gallery, Blog,
                Contact, NotFound)
  context/      ThemeContext (light/dark mode, replaces theme.js)
  hooks/        useDocumentTitle
  utils/        pageTitles.js (topbar label + <title> per route)
  styles/       All 14 original CSS files, unmodified content
public/         Logo images + resume PDF (served at the site root)
```
