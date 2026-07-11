import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "bi-speedometer2" },
    { name: "Users", icon: "bi-people" },
    { name: "CVs", icon: "bi-file-earmark-person" },
    { name: "Jobs", icon: "bi-briefcase" },
    { name: "Reports", icon: "bi-bar-chart-line" },
    { name: "Settings", icon: "bi-gear" },
  ];

  const stats = [
    { title: "Total Users", value: "2,450", change: "+12%", color: "primary" },
    { title: "Verified CVs", value: "1,318", change: "+8%", color: "success" },
    { title: "Active Jobs", value: "46", change: "+4%", color: "warning" },
    { title: "New Signups", value: "124", change: "+15%", color: "info" },
  ];

  const recentUsers = [
    { name: "Nadia Rahman", role: "Candidate", status: "Active" },
    { name: "Arif Hossain", role: "Recruiter", status: "Pending" },
    { name: "Mim Akter", role: "Candidate", status: "Active" },
  ];

  const quickActions = [
    { label: "Manage Users", icon: "bi-people-fill" },
    { label: "Review CVs", icon: "bi-file-earmark-richtext" },
    { label: "Create Job", icon: "bi-plus-circle" },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <div className="d-flex flex-column flex-lg-row">
        <div className="d-lg-none p-3 bg-white border-bottom">
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
          className="bg-white border-bottom border-lg-end shadow-sm d-none d-lg-block"
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
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${activeTab === item.name ? "btn-primary text-white" : "btn-light text-muted"}`}
                  onClick={() => {
                    setActiveTab(item.name);
                    const offcanvas = document.getElementById("adminSidebar");
                    if (offcanvas) {
                      const bsOffcanvas =
                        window.bootstrap?.Offcanvas.getInstance(offcanvas);
                      bsOffcanvas?.hide();
                    }
                  }}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.name}
                </button>
              ))}
              <Link
                to="/attributes"
                className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${activeTab === "Attribute Library" ? "btn-primary text-white" : "btn-light text-muted"}`}
                onClick={() => setActiveTab("Attribute Library")}
              >
                <i className="bi bi-stack me-2"></i>
                Attribute Library
              </Link>
            </div>
          </nav>

          <div className="p-3 border-top">
            <div className="card border-0 bg-primary-subtle">
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
          className="offcanvas offcanvas-start"
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
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`btn text-start d-flex align-items-center justify-content-start ${activeTab === item.name ? "btn-primary text-white" : "btn-light text-muted"}`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <i className={`bi ${item.icon} me-2`}></i>
                    {item.name}
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-3 border-top">
              <div className="card border-0 bg-primary-subtle">
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
              {stats.map((item) => (
                <div className="col-12 col-sm-6 col-xl-3" key={item.title}>
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className={`text-${item.color} mb-2`}>
                        <i className="bi bi-circle-fill small"></i>
                      </div>
                      <p className="text-muted mb-1 small">{item.title}</p>
                      <h3 className="fw-bold mb-1">{item.value}</h3>
                      <small className="text-muted">
                        {item.change} this month
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-12 col-xl-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Recent User Activity</h5>
                      <button className="btn btn-sm btn-outline-primary">
                        View All
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((userItem) => (
                            <tr key={userItem.name}>
                              <td className="fw-semibold">{userItem.name}</td>
                              <td>{userItem.role}</td>
                              <td>
                                <span
                                  className={`badge ${userItem.status === "Active" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}
                                >
                                  {userItem.status}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-secondary">
                                  Manage
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-4">
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Quick Actions</h5>
                    {quickActions.map((item) => (
                      <button
                        key={item.label}
                        className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
                      >
                        <i className={`bi ${item.icon}`}></i>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
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
