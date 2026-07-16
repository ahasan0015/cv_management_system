import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardRoute } from "../utils/dashboardRoute";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top border-bottom">
      <div className="container py-2">
        <a className="navbar-brand fw-bold text-primary me-3" href="/">
          JobPortal
        </a>

        <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 ms-auto">
          <a
            className="nav-link px-3 py-2 rounded-pill text-dark fw-semibold"
            href="/"
          >
            <i className="bi bi-house-door me-1"></i> Home
          </a>
          <a
            className="nav-link px-3 py-2 rounded-pill text-dark fw-semibold"
            href="#jobs"
          >
            <i className="bi bi-briefcase me-1"></i> Jobs
          </a>

          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2 rounded-pill"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={
                    user.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name || "User") +
                      "&background=0d6efd&color=fff"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: 28, height: 28, objectFit: "cover" }}
                />
                <span>{user.name}</span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={getDashboardRoute(user.role)}
                  >
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <a className="btn btn-primary rounded-pill px-3" href="/login">
              <i className="bi bi-box-arrow-in-right me-1"></i> Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
