import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import ScrollToTop from './components/Ui/ScrollToTop.jsx'
import { Toaster } from "react-hot-toast";     //for popup on submit

import { lazy, Suspense, useEffect, useState } from "react";

import { wakeUpServer, saveUser } from "./api";
import { useAnalyticsInit, useAnalyticsPageView } from "./hooks/useAnalytics.js";

import './app.css'

import { getBrowserId } from "./utils/userId";


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

const ProjectDetail = lazy(() => import('./pages/Projects/project_detail/ProjectDetails.jsx'))
const PdfViwer = lazy(() => import('./pages/Projects/pdf_Viewer/SlideViewer.jsx'))
const GithubViewer = lazy(() => import('./pages/Projects/github_viewer/GitHubViewer.jsx'))
const PrivateGithubViewer = lazy(() => import('./pages/Projects/github_viewer/private_git.jsx'))
const ProjectInsights = lazy(() => import('./pages/Projects/github_viewer/ProjectInsights.jsx'))

function RouteFallback() {
  return null
}

export default function App() {
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const initialize = async () => {
      try {
        const browserID = getBrowserId();
        const isVisited = sessionStorage.getItem("visited");

        if (!isVisited) {
          const res = await saveUser(browserID);
          setUserId(res.data.userId);
          sessionStorage.setItem("visited", "true");
        }

        await wakeUpServer();
      } catch (err) {
        console.log("Backend init error:", err.message);
      }
    };
    initialize();
  }, []);


  useAnalyticsInit(userId);
  useAnalyticsPageView();

  return (
    <Suspense fallback={<RouteFallback />}>
      <ScrollToTop />
      <Toaster position="top-right" />
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

          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/projects/:projectId/pdf" element={<PdfViwer />} />
          <Route path="/projects/:projectId/github" element={<GithubViewer />} />
          <Route path="/projects/:projectId/private" element={<PrivateGithubViewer />} />
          <Route path="/projects/:projectId/github/insights" element={<ProjectInsights />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
