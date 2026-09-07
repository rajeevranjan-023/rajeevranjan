import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";

export default function NotFound() {
    const { projectId } = useParams();

return (
  <div className="error-wrap reveal">

    <div className="error-code" style={{ fontSize: "54px"}}
    >ACCESS RESTRICTED</div>

    <h2>Resource Not Available</h2>

    <p style={{ maxWidth: 420, margin: "0 auto 24px" }}>
      This section is currently <b>unavailable</b> for public access as it is connected 
      to a live production environment. Access has been restricted to ensure 
      system integrity and data security.
    </p>


    <Link to={`/projects/${projectId}`} className="btn btn-primary">
      <i className="fa-solid fa-arrow-left"></i> Back to Projects
    </Link>

  </div>
);}
