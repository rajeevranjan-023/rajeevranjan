import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProjectInsights.css"

export default function ProjectInsights() {

  const { OWNER, REPO } = useLocation().state || {};

  const [repoData, setRepoData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [lastCommit, setLastCommit] = useState(null);
  const [commitDetails, setCommitDetails] = useState(null);

  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);

  const [commitActivity, setCommitActivity] = useState([]);
  const [codeFreq, setCodeFreq] = useState([]);
  const [branches, setBranches] = useState([]);
  const [releases, setReleases] = useState([]);

  const [issuesOpen, setIssuesOpen] = useState([]);
  const [issuesClosed, setIssuesClosed] = useState([]);

//______________________________________________________________________________________________________________
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 

  useEffect(() => {
    if (!OWNER || !REPO) return;
    const fetchData = async () => {
      try {
        // ================= REPO INFO =================
        const repoRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`);
        const repoJson = await repoRes.json();
        setRepoData(repoJson);
      } catch (err) {
        console.error("Repo fetch error:", err);
      }

      try {
        // ================= COMMITS =================
        const commitRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=10`);
        const commitJson = await commitRes.json();

        if (Array.isArray(commitJson)) {
          setCommits(commitJson);
          setLastCommit(commitJson[0]);

          if (commitJson[0]) {
            try {
              const detailRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits/${commitJson[0].sha}`);
              const detailJson = await detailRes.json();
              setCommitDetails(detailJson);
            } catch (err) {
              console.error("Commit details error:", err);
            }
          }
        }
      } catch (err) {
        console.error("Commits fetch error:", err);
      }

      try {
        // ================= LANGUAGES =================
        const langRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/languages`);
        const langJson = await langRes.json();
        setLanguages(langJson || {});
      } catch (err) {
        console.error("Languages error:", err);
      }

      try {
        // ================= CONTRIBUTORS =================
        const contRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contributors`);
        const contJson = await contRes.json();
        setContributors(Array.isArray(contJson) ? contJson : []);
      } catch (err) {
        console.error("Contributors error:", err);
      }

      try {
        // ================= STATS =================
        const activityRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/stats/commit_activity`);
        const activityJson = await activityRes.json();
        setCommitActivity(Array.isArray(activityJson) ? activityJson : []);
      } catch (err) {
        console.error("Commit activity error:", err);
      }

      try {
        const freqRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/stats/code_frequency`);
        const freqJson = await freqRes.json();
        setCodeFreq(Array.isArray(freqJson) ? freqJson : []);
      } catch (err) {
        console.error("Code frequency error:", err);
      }

      try {
        // ================= BRANCHES =================
        const branchRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/branches`);
        const branchJson = await branchRes.json();
        setBranches(Array.isArray(branchJson) ? branchJson : []);
      } catch (err) {
        console.error("Branches error:", err);
      }

      try {
        // ================= RELEASES =================
        const relRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases`);
        const relJson = await relRes.json();
        setReleases(Array.isArray(relJson) ? relJson : []);
      } catch (err) {
        console.error("Releases error:", err);
      }

      try {
        // ================= ISSUES =================
        const openRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues?state=open`);
        const openJson = await openRes.json();
        setIssuesOpen(Array.isArray(openJson) ? openJson : []);
      } catch (err) {
        console.error("Open issues error:", err);
      }

      try {
        const closedRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues?state=closed`);
        const closedJson = await closedRes.json();
        setIssuesClosed(Array.isArray(closedJson) ? closedJson : []);
      } catch (err) {
        console.error("Closed issues error:", err);
      }

    };
    fetchData();
  }, [OWNER, REPO]);
  
//______________________________________________________________________________________________________________
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <div style={{ padding: "20px", color: "white" }}>

      <h1>📊 Project Insights 
        <button style={{ marginLeft: "20px", padding: "5px 10px", cursor: "pointer" }} onClick={() => window.history.back()}>
          🔙 Back
        </button>
        </h1>

      {/* ================= BASIC INFO ================= */}
      {repoData && (
        <div>
          <h2>Repo Info</h2>
          <p>📅 Created: {new Date(repoData.created_at).toLocaleString()}</p>
          <p>🔄 Last Updated: {new Date(repoData.updated_at).toLocaleString()}</p>
        </div>
      )}

      {/* ================= LAST COMMIT ================= */}
      {lastCommit && (
        <div>
          <h2>Latest Commit</h2>
          <p><strong>{lastCommit.commit.message}</strong></p>
          <p>
            {lastCommit.commit.author.name} —{" "}
            {new Date(lastCommit.commit.author.date).toLocaleString()}
          </p>
        </div>
      )}

      {/* ================= COMMIT DETAILS ================= */}
      {commitDetails && (
        <div>
          <h2>Commit Details</h2>
          <p>➕ Additions: {commitDetails.stats?.additions}</p>
          <p>➖ Deletions: {commitDetails.stats?.deletions}</p>

          <h3>Changed Files:</h3>
          {commitDetails.files?.map((file) => (
            <div key={file.filename}>
              <p>{file.filename}</p>
              <pre style={{ background: "#111", padding: "10px", overflowX: "auto" }}>
                {file.patch}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* ================= LANGUAGES ================= */}
      <div>
        <h2>Languages</h2>
        {Object.entries(languages).map(([lang, bytes]) => (
          <p key={lang}>{lang}: {bytes}</p>
        ))}
      </div>

      {/* ================= CONTRIBUTORS ================= */}
       <div>
         <h2>Contributors</h2>       

         {contributors.map((c) => {
           const displayName =
             c.login === "rajeevranjan-023"
               ? "rajeevranjan"
               : c.login;       

           return (
             <p key={c.id}>
               {displayName} — {c.contributions} commits
             </p>
           );
         })}
       </div>

      {/* ================= BRANCHES ================= */}
      <div>
        <h2>Branches</h2>
        {branches.map((b) => (
          <p key={b.name}>{b.name}</p>
        ))}
      </div>

      {/* ================= RELEASES ================= */}
      <div>
        <h2>Releases</h2>
        {releases.map((r) => (
          <div key={r.id}>
            <p><strong>{r.name}</strong></p>
            <p>{r.body}</p>
          </div>
        ))}
      </div>

      {/* ================= ISSUES ================= */}
      <div>
        <h2>Issues</h2>
        <p>🟢 Open: {issuesOpen.length}</p>
        <p>🔴 Closed: {issuesClosed.length}</p>
      </div>

      {/* ================= STATS ================= */}
      <div>
        <h2>Stats</h2>
        <p>📊 Weekly Activity Points: {commitActivity?.length}</p>
        <p>📈 Code Frequency Points: {codeFreq?.length}</p>
      </div>

    </div>
  );
}
