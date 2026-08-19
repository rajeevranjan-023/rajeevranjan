import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetails.css";


//________________________________________________________________________________
// ===============================================================================
const projects = {
  "water-tank": {
    title: "Water Tank Management System",

    description:
      "An automated IoT-based water tank monitoring and management system using ESP32, sensors, backend services and AI-based prediction.",

    technologies: [
      "ESP32",
      "IoT",
      "Node.js",
      "MongoDB",
      "Python",
      "AI/ML",
    ],

    resources: [
      {
        icon: "📄",
        title: "Project Report",
        description: "Complete project documentation",
        type: "pdf",
        pdfUrl: "/WaterMotorStarter.pdf",
      },
      
      {
        icon: "🔬",
        title: "Research",
        description: "Research, methodology and references",
        type: "page",
        path: "research",
      },
      {
        icon: "💻",
        title: "Source Code",
        description: "View the complete source code",
        type: "external",
        url: "https://github.com/yourusername/water-tank",
      },
      {
        icon: "🖼️",
        title: "Gallery",
        description: "Screenshots and project images",
        type: "page",
        path: "gallery",
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
  "gps-tracker": {
    title: "GPS Live Tracker",

    description:
      "A real-time GPS tracking system that displays live vehicle location using GPS hardware, backend APIs and an interactive map.",

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
        title: "Project Report",
        description: "Complete GPS tracker documentation",
        type: "pdf",
        pdfUrl: "/pdf/gps-tracker-report.pdf",
      },
      {
        icon: "🔬",
        title: "Research",
        description: "Research and methodology",
        type: "page",
        path: "research",
      },
      {
        icon: "💻",
        title: "Source Code",
        description: "View the complete source code",
        type: "external",
        url: "https://github.com/yourusername/gps-tracker",
      },
      {
        icon: "🖼️",
        title: "Gallery",
        description: "GPS tracker screenshots",
        type: "page",
        path: "gallery",
      },
      {
        icon: "🎥",
        title: "Demo",
        description: "Watch the live demonstration",
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
  "local-finder": {
    title: "Local Finder",

    description:
      "A platform that helps users discover local service providers such as electricians, plumbers, painters and other professionals.",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
    ],

    resources: [
      {
        icon: "📄",
        title: "Project Report",
        description: "Complete project documentation",
        type: "pdf",
        pdfUrl: "/pdf/local-finder-report.pdf",
      },
      {
        icon: "🔬",
        title: "Research",
        description: "Research and methodology",
        type: "page",
        path: "research",
      },
      {
        icon: "💻",
        title: "Source Code",
        description: "View the complete source code",
        type: "external",
        url: "https://github.com/yourusername/local-finder",
      },
      {
        icon: "🖼️",
        title: "Gallery",
        description: "Project screenshots",
        type: "page",
        path: "gallery",
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
        description: "Project results",
        type: "page",
        path: "results",
      },
    ],
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
        >
          ← Back to Projects
        </button>

        <h1>Project Not Found</h1>
        <p>The requested project does not exist.</p>
      </main>
    );
  }

  const handleResource = (resource) => {
    if (resource.type === "pdf") {            //pdf viewer
      navigate("/projects/pdf", {
        state: {
          pdfUrl: resource.pdfUrl,
          title: resource.title,
        },
      });
      return;
    }

    if (resource.type === "pdf") {
      navigate("/projects/pdf", {
        state: {
          pdfUrl: resource.pdfUrl,
          title: resource.title,
        },
      });
      return;
    }

    if (resource.type === "page") {          // react page
      navigate(`/projects/${projectId}/${resource.path}`);
      return;
    }

    if (resource.type === "external") {      // External link
      window.open(resource.url, "_blank");
    }
  };
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
        <p className="project-description">
          {project.description}
        </p>

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
              </div>

              <span className="resource-arrow">→</span>
            </button>

          ))}

        </div>

      </section>

    </main>
  );
}