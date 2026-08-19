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

  useEffect(() => {

    if (!OWNER || !REPO) return;

    // ================= REPO INFO =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}`)
      .then(res => res.json())
      .then(setRepoData);

    // ================= COMMITS =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=10`)
      .then(res => res.json())
      .then((data) => {
        setCommits(data);
        setLastCommit(data[0]);

        // fetch details of latest commit
        if (data[0]) {
          fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits/${data[0].sha}`)
            .then(res => res.json())
            .then(setCommitDetails);
        }
      });

    // ================= LANGUAGES =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/languages`)
      .then(res => res.json())
      .then(setLanguages);

    // ================= CONTRIBUTORS =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contributors`)
      .then(res => res.json())
      .then(setContributors);

    // ================= STATS =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/stats/commit_activity`)
      .then(res => res.json())
      .then(setCommitActivity);

    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/stats/code_frequency`)
      .then(res => res.json())
      .then(setCodeFreq);

    // ================= BRANCHES =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/branches`)
      .then(res => res.json())
      .then(setBranches);

    // ================= RELEASES =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases`)
      .then(res => res.json())
      .then(setReleases);

    // ================= ISSUES =================
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues?state=open`)
      .then(res => res.json())
      .then(setIssuesOpen);

    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues?state=closed`)
      .then(res => res.json())
      .then(setIssuesClosed);

  }, [OWNER, REPO]);

  return (
    <div style={{ padding: "20px", color: "white" }}>

      <h1>📊 Project Insights</h1>

      {/* ================= BASIC INFO ================= */}
      {repoData && (
        <div>
          <h2>Repo Info</h2>
          <p>📅 Created: {new Date(repoData.created_at).toLocaleString()}</p>
          <p>🔄 Last Updated: {new Date(repoData.updated_at).toLocaleString()}</p>
          <p>⭐ Stars: {repoData.stargazers_count}</p>
          <p>🍴 Forks: {repoData.forks_count}</p>
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
              <pre style={{ background: "#111", padding: "10px" }}>
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