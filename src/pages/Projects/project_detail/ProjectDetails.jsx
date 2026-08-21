import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetails.css";


//________________________________________________________________________________
// ===============================================================================
const projects = {
  "a7f3k9x2qz": {                               // water tank project
    title: "Water Tank Management System",

    description:[
      "An automated IoT-based water tank monitoring and management system using ESP32, sensors, backend services and AI-based prediction.",
      "Achieved 100% automation in maintaining predefined water levels",
      "Sensor-driven feedback loop removes the need for manual checks",
      "Optimized the system afterwards to improve overall water-management efficiency"
    ],
    technologies: [
      "version v2 online comapatible:-",
      "ESP32",
      "IoT",
      "Node.js",
      "MongoDB",
      "c++",
    ],

    resources: [
      {
        icon: "📄",
        title: "Project specification",
        description: "Complete project detailed, woking etc",
        type: "pdf",
        pdfUrl: "/waterMotor/machanism.pdf",
        date: "dec 2025"
      },
      {
        icon: "💻",
        title: "Source Code v2 model",
        description: "View the complete source code for online compactible system",
        type: "github",
        owner:"rajeevranjan-023",
        repo: "rajeevranjan",
        date: " repository is NOT uptodate, Waiting for lastest commit",
      },
      {
        icon: "🖼️",
        title: "Gallery",
        description: "Screenshots and project images",
        type: "page",
        path: "gallery",
      },
      {
        icon: "🔬",
        title: "Development & Testing",
        description: "Development Process & Testing Experimental Design & Analysis",
        type: "pdf",
        pdfUrl: "/waterMotor/circuit.pdf",
      },
      {
        icon: "🕒",
        title: "Timeline 1st part",
        description: "Development of status & control pannel {upper part}",
        type: "pdf",
        pdfUrl: "/waterMotor/upper part.pdf",
      },
      {
        icon: "🕒",
        title: "Timeline 2st part",
        description: "Development of power & execution pannel {lower part}",
        type: "pdf",
        pdfUrl: "/waterMotor/lower part.pdf",
      },
      {
        icon: "🎥",
        title: "Demo",
        description: "Watch the project demonstration",
        type: "page",
        path: "demo",
      },
      {
        icon: "📊",
        title: "Results",
        description: "Performance and project results",
        type: "page",
        path: "results",
      },
    ],
  },
//________________________________________________________________________________
// ===============================================================================
   "b4x9m2t7qk": {                      //weather website
    title: "weather ",

    description:[
      "A real-time GPS tracking system that displays live vehicle location using GPS hardware, backend APIs and an interactive map.",
      "Live weather lookup by user-entered location",
      "Dynamic, responsive interface built with HTML, CSS & JavaScript",
      "Clean REST API integration and response handling"
    ],
    technologies: [
      "ESP32",
      "NEO-6M GPS",
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Leaflet",
    ],

    resources: [
      {
        icon: "📄",
        title: "Project specification",
        description: "Complete project detailed, woking etc",
        type: "page",
        path: "results",
      },
      {
        icon: "💻",
        title: "Source Code",
        description: "View the complete source code for frontend",
        type: "github",
        owner:"rajeevranjan-023",
        repo: "rajeevranjan",
      },
      {
        icon: "🌐",
        title: "Live site",
        description: "Explore to know more about this website",
        type: "external",
        url: "https://www.youtube.com/",
      }
    ],
  },

//________________________________________________________________________________
// ===============================================================================
  "c2f9a6t3wz": {                               //portfolio site
    title: "this PORTFOLIO site ", 

    description:[
      "A comprehensive full-stack portfolio that highlights my skills in web development, system architecture, and real-world project implementation, focusing on intuitive design and optimized performance.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "REST API",
      "MongoDB Atlas",
      
    ],

    resources: [
      {
        icon: "📄",
        title: "Project specification",
        description: "Complete project detailed, woking etc",
        type: "page",
        path: "results",
      },
      {
        icon: "💻",
        title: "Source Code",
        description: "View the complete source code for frontend",
        type: "github",
        owner:"rajeevranjan-023",
        repo: "rajeevranjan",
      },
      {
        icon: "🌐",
        title: "Live site",
        description: "Explore to know more about this website",
        type: "external",
        url: "https://www.youtube.com/",
      }
    ],
  },

//________________________________________________________________________________
// ===============================================================================
  "d7n4c8v2jb": {                                // loco website
    title: "Added soon!",

    description:[

    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
      "MongoDB Atlas",
      "React.js",
      "Express.js",
      "Tailwind css",
      "ESP32 module",
      "C++"
    ],

    resources: [],
  },


  
};
//________________________________________________________________________________
// ===============================================================================
export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = projects[projectId];

  // Invalid project
  if (!project) {
    return (
      <main className="project-details">
        <button
          className="back-btn"
          onClick={() => navigate("/projects")}
        >← Back to Projects
        </button>
        <h1>Project Not Found</h1>
        <p>The requested project does not exist.</p>
      </main>
    );
  }

  const handleResource = (resource) => {
    if (resource.type === "pdf") {               //pdf viewer
      navigate(`/projects/${projectId}/pdf`, {
        state: {
          pdfUrl: resource.pdfUrl,
          title: resource.title,
        },
      });
      return;
    }

    if (resource.type === "page") {              // react page
      navigate(`/projects/${projectId}/${resource.path}`);
      return;
    }

    if (resource.type === "external") {          // External link
      // window.open(resource.url, "_blank");
      window.location.href = resource.url;
    }

    if (resource.type === "github") {            // github link
     navigate(`/projects/${projectId}/github`, {
      state: {
        OWNER: resource.owner,
        REPO: resource.repo,
      },
    });

  };}
  //_____________________________________________________________
  return (
    <main className="project-details">

      {/* BACK */}
      <button                                    
        className="back-btn"
        onClick={() => navigate("/projects")}
      >← Back to Projects
      </button>

      {/* PROJECT HEADER */}
      <section className="project-hero">
        <span className="project-label">PROJECT</span>

        <h1>{project.title}</h1>

        <ul>
          {project.description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <div className="tech-list">
          {project.technologies.map((tech) => (
            <span key={tech}>
              {tech}
            </span>
          ))}
        </div>

      </section>

      {/* RESOURCE SECTION */}
      <section className="resource-section">

        <div className="section-heading">
          <span>PROJECT RESOURCES</span>
          <h2>Explore this project</h2>
        </div>

        <div className="resource-grid">
          {project.resources.map((resource) => (
            <button
              className="resource-card"
              key={resource.title}
              onClick={() => handleResource(resource)}
            >
              <div className="resource-icon">
                {resource.icon}
              </div>

              <div className="resource-info">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <h6>{resource.date}</h6>
              </div>

              <span className="resource-arrow">→</span>
            </button>

          ))}

        </div>

      </section>

    </main>
  );
}