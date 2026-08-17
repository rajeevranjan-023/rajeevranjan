import { useEffect, useState } from "react";
import "./GitHubViewer.css";

const OWNER = "rajeevranjan-023";
const REPO = "full-DSA-notes";

export default function GitHubViewer() {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [loading, setLoading] = useState(false);

  // ================================
  // GET REPOSITORY FILES
  // ================================
  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/?ref=main`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API Error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        console.log("Repository:", data);
        setFiles(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // ================================
  // OPEN FILE
  // ================================
  const openFile = async (file) => {
    if (file.type !== "file") return;

    setLoading(true);

    try {
      const res = await fetch(file.url);

      if (!res.ok) {
        throw new Error(`File API Error: ${res.status}`);
      }

      const data = await res.json();

      const decodedCode = atob(data.content);

      setCode(decodedCode);
      setCurrentFile(file.path);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="github-viewer">

      {/* ================================
          FILE EXPLORER
      ================================= */}

      <aside className="github-sidebar">

        <h3>📦 {REPO}</h3>

        {files.map((file) => (
          <div
            key={file.path}
            className="github-file"
            onClick={() => openFile(file)}
          >
            {file.type === "dir" ? "📁" : "📄"}{" "}
            {file.name}
          </div>
        ))}

      </aside>


      {/* ================================
          CODE VIEWER
      ================================= */}

      <main className="github-code">

        <div className="github-code-header">
          {currentFile || "Select a file"}
        </div>

        {loading ? (
          <div className="github-loading">
            Loading code...
          </div>
        ) : (
          <pre>
            <code>{code}</code>
          </pre>
        )}

      </main>

    </div>
  );
}