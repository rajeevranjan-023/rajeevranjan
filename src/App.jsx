import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'

// Route-level code splitting — each page is only downloaded when the
// user actually navigates to it, instead of bundling all 11 pages
// into one big chunk up front.
const Home = lazy(() => import('./pages/Home/Home.jsx'))
const About = lazy(() => import('./pages/About/About.jsx'))
const Skills = lazy(() => import('./pages/Skills/Skills.jsx'))
const Projects = lazy(() => import('./pages/Projects/Projects.jsx'))
const Experience = lazy(() => import('./pages/Experience/Experience.jsx'))
const Education = lazy(() => import('./pages/Education/Education.jsx'))
const Certifications = lazy(() => import('./pages/Certifications/Certifications.jsx'))
const Gallery = lazy(() => import('./pages/Gallery/Gallery.jsx'))
const Blog = lazy(() => import('./pages/Blog/Blog.jsx'))
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))


function RouteFallback() {
  return null
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
