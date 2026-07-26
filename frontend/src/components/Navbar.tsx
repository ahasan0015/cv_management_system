import { useAuth } from "../hooks/useAuth";
import { useSettings } from "../hooks/useSettings";
import { Link, useNavigate } from "react-router-dom";
import { getDashboardRoute } from "../utils/dashboardRoute";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, language, setLanguage, t } = useSettings();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body shadow-sm sticky-top border-bottom">
      <div className="container py-2">
        <a className="navbar-brand fw-bold text-primary me-3" href="/">
          JobPortal
        </a>

        <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 ms-auto">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1 d-flex align-items-center gap-1"
            title="Toggle Theme"
          >
            <i className={`bi ${theme === "light" ? "bi-moon-fill" : "bi-sun-fill"}`}></i>
            <span className="d-none d-md-inline small">{theme === "light" ? "Dark" : "Light"}</span>
          </button>

          {/* Language Switch Button */}
          <button
            onClick={() => setLanguage(language === "en" ? "bn" : "en")}
            className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1 fw-bold"
            title="Toggle Language"
          >
            {language === "en" ? "বাংলা" : "EN"}
          </button>

          <a
            className="nav-link px-3 py-2 rounded-pill fw-semibold"
            href="/"
          >
            <i className="bi bi-house-door me-1"></i> {t("home")}
          </a>
          <a
            className="nav-link px-3 py-2 rounded-pill fw-semibold"
            href="#jobs"
          >
            <i className="bi bi-briefcase me-1"></i> {t("jobs_nav")}
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
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="userDropdown"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={getDashboardRoute(user.role)}
                  >
                    <i className="bi bi-speedometer2 me-2"></i>
                    {t("dashboard")}
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
                    <i className="bi bi-box-arrow-right me-2"></i>{t("logout")}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <a className="btn btn-primary rounded-pill px-3" href="/login">
              <i className="bi bi-box-arrow-in-right me-1"></i> {t("login")}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;