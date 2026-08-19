import { useEffect, useState } from "react";
import "./GitHubViewer.css";
import { useLocation, useNavigate,useParams } from "react-router-dom";

export default function GitHubViewer() {

  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]); // 📁 folder history

  const location = useLocation();
  const navigate = useNavigate();

  const { OWNER, REPO } = location.state || {};
  const { projectId } = useParams();

  // ================================
  // INITIAL LOAD
  // ================================
  useEffect(() => {

    if (!OWNER || !REPO) return;

    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [OWNER, REPO]);

  // ================================  OPEN FILE / FOLDER
  const openItem = async (item) => {

    // 📁 FOLDER
    if (item.type === "dir") {
      try {
        setLoading(true);
        const res = await fetch(item.url);
        if (!res.ok) throw new Error(`Folder API Error: ${res.status}`);
        const data = await res.json();
        setHistory((prev) => [...prev, files]); // save current
        setFiles(data);
        setCurrentFile(item.path);
        setCode("");
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
      return;
    }


    if (item.type === "file") {              // 📄 FILE
      try {
        setLoading(true);
        const res = await fetch(item.url);
        if (!res.ok) throw new Error(`File API Error: ${res.status}`);
        const data = await res.json();
        const decoded = atob(data.content);
        setCode(decoded);
        setCurrentFile(item.path);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
  };

  // ================================            BACK (FOLDER NAVIGATION)
  const goBackFolder = () => {
    if (history.length === 0) return;
    const prev = [...history];
    const last = prev.pop();
    setHistory(prev);
    setFiles(last);
    setCode("");
    setCurrentFile("");
  };

  // ================================         UI
  return (
  <>
    <div className="github-viewer">
      {/* SIDEBAR */}
      <aside className="github-sidebar">

        <div className="github-top">
          <button onClick={() => navigate(-1)}>← Back</button>
          <h3>📦 {REPO}</h3>
        </div>

        {history.length > 0 && (
          <button className="folder-back" onClick={goBackFolder}>
            ⬅ Folder Back
          </button>
        )}

        {files.map((item) => (
          <div
            key={item.path}
            className="github-file"
            onClick={() => openItem(item)}
          >
            {item.type === "dir" ? "📁" : "📄"} {item.name}
          </div>
        ))}
      </aside>


      {/* CODE VIEWER */}
      <main className="github-code">

        <div className="github-code-header">
          {currentFile || "Select a file"}
        </div>

        {loading ? (
          <div className="github-loading">
            Loading...
          </div>
        ) : (
          <pre>
            <code>{code || "Click a file to view code"}</code>
          </pre>
        )}

      </main>
    </div>

    <div className="insights-section">
      <button
        className="insights-btn"
        onClick={() =>
          navigate(`/projects/${projectId}/github/insights`, {
            state: {
              OWNER: OWNER,
              REPO: REPO,
            },
          })
        }
      >
        📊 View Project Insights →
      </button>
    </div>

  </>
  );
}