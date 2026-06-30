import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          The<span>Press</span>
        </Link>
        <div className="navbar-actions">
          <button className="btn btn-primary btn-sm" onClick={() => navigate("/new")}>
            + New Post
          </button>
        </div>
      </div>
    </nav>
  );
}
