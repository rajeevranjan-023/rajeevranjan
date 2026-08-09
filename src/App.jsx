import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'

import { lazy, Suspense, useEffect, useState } from "react";

import { wakeUpServer, saveLocation, saveUser } from "./api";
import { getLocationData } from "./utils/location.js";
 
import './app.css'
import LocationERROR from './pages/NotFound/LocationERROR.jsx';

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
const PdfPage = lazy(() => import('./pages/pdf_Viewer/pdf.jsx'))



function RouteFallback() {
  return null
}

export default function App() {
  //_______________________________________
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const browserID = getBrowserId();
        await saveUser(browserID,); 
        // console.log("browserID : ", browserID)
  
        const res = await saveUser(browserID);
        const userId = res.data.userId;
        // console.log("userId: ", userId);

        await wakeUpServer();
        // console.log("Backend Ready");
        setBackendReady(true);                    // Backend is awake

        const locationData = await getLocationData();
        await saveLocation({
            ...locationData,
            browserId: browserID,
            userId: userId, 
        })                        
          .then(() => {
            // console.log("Location Saved");
          })
          .catch((err) => {
            console.log("Error saving location:", err);
          });
      } catch (err) {
        console.log("FULL ERROR:", err);
      }
    };
    initialize();
  }, []);                                     
  

  //_______________________________________
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
          <Route path="/:section/pdf" element={<PdfPage />} />
          
        </Route>
      </Routes>
    </Suspense>
  )
}
