import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-vh-100 bg-body">
      <Navbar />
      <div className="d-flex flex-column flex-lg-row">
        <div className="d-lg-none p-3 bg-body border-bottom">
          <button
            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#adminSidebar"
            aria-controls="adminSidebar"
          >
            <span className="fw-semibold">Menu</span>
            <i className="bi bi-list"></i>
          </button>
        </div>

        <aside
          className="bg-body border-bottom border-lg-end shadow-sm d-none d-lg-block"
          style={{ width: "100%", maxWidth: 270 }}
        >
          <div className="p-3 p-lg-4 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style={{ width: 44, height: 44 }}
              >
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold">JobPortal</h5>
                <small className="text-muted">Admin Control</small>
              </div>
            </div>
          </div>

          <nav className="p-3">
            <div className="d-flex flex-wrap flex-lg-column gap-2">
              <button
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Dashboard"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Dashboard")}
              >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </button>
              <button
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Users"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Users")}
              >
                <i className="bi bi-people me-2"></i>
                Users
              </button>
              <button
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "CVs"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("CVs")}
              >
                <i className="bi bi-file-earmark-person me-2"></i>
                CVs
              </button>
              <button
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Jobs"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Jobs")}
              >
                <i className="bi bi-briefcase me-2"></i>
                Jobs
              </button>
              <button
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Reports"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Reports")}
              >
                <i className="bi bi-bar-chart-line me-2"></i>
                Reports
              </button>
              <button
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Settings"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Settings")}
              >
                <i className="bi bi-gear me-2"></i>
                Settings
              </button>

              <Link
                to="/admin-user"
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Attribute Library"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Attribute Library")}
              >
                <i className="bi bi-stack me-2"></i>
                Admin User Manage
              </Link>
              <Link
                to="/attributes"
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${
                  activeTab === "Attribute Library"
                    ? "btn-primary text-white"
                    : "btn-outline-secondary border-0 text-body"
                }`}
                onClick={() => setActiveTab("Attribute Library")}
              >
                <i className="bi bi-stack me-2"></i>
                Attribute Library
              </Link>
            </div>
          </nav>

          <div className="p-3 border-top">
            <div className="card border-0 bg-primary-subtle text-dark">
              <div className="card-body">
                <h6 className="fw-bold mb-1">System health</h6>
                <p className="small text-muted mb-2">
                  Everything is running smoothly today.
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  View Logs
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div
          className="offcanvas offcanvas-start bg-body"
          tabIndex={-1}
          id="adminSidebar"
          aria-labelledby="adminSidebarLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title fw-bold" id="adminSidebarLabel">
              Admin Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <div className="p-3 p-lg-4 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                  style={{ width: 44, height: 44 }}
                >
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">JobPortal</h5>
                  <small className="text-muted">Admin Control</small>
                </div>
              </div>
            </div>

            <nav className="p-3">
              <div className="d-flex flex-column gap-2">
                <button
                  className={`btn text-start d-flex align-items-center justify-content-start ${
                    activeTab === "Dashboard"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary border-0 text-body"
                  }`}
                  onClick={() => setActiveTab("Dashboard")}
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </button>
                <button
                  className={`btn text-start d-flex align-items-center justify-content-start ${
                    activeTab === "Users"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary border-0 text-body"
                  }`}
                  onClick={() => setActiveTab("Users")}
                >
                  <i className="bi bi-people me-2"></i>
                  Users
                </button>
                <button
                  className={`btn text-start d-flex align-items-center justify-content-start ${
                    activeTab === "CVs"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary border-0 text-body"
                  }`}
                  onClick={() => setActiveTab("CVs")}
                >
                  <i className="bi bi-file-earmark-person me-2"></i>
                  CVs
                </button>
                <button
                  className={`btn text-start d-flex align-items-center justify-content-start ${
                    activeTab === "Jobs"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary border-0 text-body"
                  }`}
                  onClick={() => setActiveTab("Jobs")}
                >
                  <i className="bi bi-briefcase me-2"></i>
                  Jobs
                </button>
                <button
                  className={`btn text-start d-flex align-items-center justify-content-start ${
                    activeTab === "Reports"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary border-0 text-body"
                  }`}
                  onClick={() => setActiveTab("Reports")}
                >
                  <i className="bi bi-bar-chart-line me-2"></i>
                  Reports
                </button>
                <button
                  className={`btn text-start d-flex align-items-center justify-content-start ${
                    activeTab === "Settings"
                      ? "btn-primary text-white"
                      : "btn-outline-secondary border-0 text-body"
                  }`}
                  onClick={() => setActiveTab("Settings")}
                >
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </button>
              </div>
            </nav>

            <div className="p-3 border-top">
              <div className="card border-0 bg-primary-subtle text-dark">
                <div className="card-body">
                  <h6 className="fw-bold mb-1">System health</h6>
                  <p className="small text-muted mb-2">
                    Everything is running smoothly today.
                  </p>
                  <button className="btn btn-outline-primary btn-sm">
                    View Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-grow-1">
          <div className="p-3 p-lg-4">
            <div className="row g-4 mb-4">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100 bg-body">
                  <div className="card-body">
                    <div className="text-primary mb-2">
                      <i className="bi bi-circle-fill small"></i>
                    </div>
                    <p className="text-muted mb-1 small">Total Users</p>
                    <h3 className="fw-bold mb-1">2,450</h3>
                    <small className="text-muted">+12% this month</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100 bg-body">
                  <div className="card-body">
                    <div className="text-success mb-2">
                      <i className="bi bi-circle-fill small"></i>
                    </div>
                    <p className="text-muted mb-1 small">Verified CVs</p>
                    <h3 className="fw-bold mb-1">1,318</h3>
                    <small className="text-muted">+8% this month</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100 bg-body">
                  <div className="card-body">
                    <div className="text-warning mb-2">
                      <i className="bi bi-circle-fill small"></i>
                    </div>
                    <p className="text-muted mb-1 small">Active Jobs</p>
                    <h3 className="fw-bold mb-1">46</h3>
                    <small className="text-muted">+4% this month</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100 bg-body">
                  <div className="card-body">
                    <div className="text-info mb-2">
                      <i className="bi bi-circle-fill small"></i>
                    </div>
                    <p className="text-muted mb-1 small">New Signups</p>
                    <h3 className="fw-bold mb-1">124</h3>
                    <small className="text-muted">+15% this month</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-xl-8">
                <div className="card border-0 shadow-sm bg-body">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Recent User Activity</h5>
                      <button className="btn btn-sm btn-outline-primary">
                        View All
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle mb-0 text-body">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="fw-semibold">Nadia Rahman</td>
                            <td>Candidate</td>
                            <td>
                              <span className="badge bg-success-subtle text-success">
                                Active
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-secondary">
                                Manage
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-semibold">Arif Hossain</td>
                            <td>Recruiter</td>
                            <td>
                              <span className="badge bg-warning-subtle text-warning">
                                Pending
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-secondary">
                                Manage
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-semibold">Mim Akter</td>
                            <td>Candidate</td>
                            <td>
                              <span className="badge bg-success-subtle text-success">
                                Active
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-secondary">
                                Manage
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-4">
                <div className="card border-0 shadow-sm mb-4 bg-body">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Quick Actions</h5>
                    <button className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
                      <i className="bi bi-people-fill"></i>
                      Manage Users
                    </button>
                    <button className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
                      <i className="bi bi-file-earmark-richtext"></i>
                      Review CVs
                    </button>
                    <button className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
                      <i className="bi bi-plus-circle"></i>
                      Create Job
                    </button>
                  </div>
                </div>

                <div className="card border-0 shadow-sm bg-body">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Platform Highlights</h5>
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span>New CV uploads</span>
                        <strong>120</strong>
                      </li>
                      <li className="d-flex justify-content-between py-2 border-bottom">
                        <span>Pending approvals</span>
                        <strong>8</strong>
                      </li>
                      <li className="d-flex justify-content-between py-2">
                        <span>Support tickets</span>
                        <strong>5</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;