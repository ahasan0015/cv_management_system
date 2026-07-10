import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../assets/css/dashboard.css"; // Ensure custom CSS is imported

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "bi-speedometer2" },
    { name: "Users", icon: "bi-people" },
    { name: "Jobs", icon: "bi-briefcase" },
    { name: "Payments", icon: "bi-credit-card" },
    { name: "Settings", icon: "bi-gear" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar Section */}
      <aside className="sidebar p-4 d-none d-lg-block">
        <div className="d-flex align-items-center mb-5">
          <i className="bi bi-diagram-3-fill text-primary fs-2 me-2"></i>
          <h4 className="fw-bold mb-0">JobPortal</h4>
        </div>
        <nav className="nav flex-column gap-2">
          {menuItems.map((item) => (
            <a href="#" key={item.name} className={`nav-link ${activeTab === item.name ? "active" : ""}`} onClick={() => setActiveTab(item.name)}>
              <i className={`bi ${item.icon} me-3`}></i> {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1" style={{ marginLeft: "260px" }}>
        {/* Top Navbar */}
        <header className="bg-white p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">{activeTab}</h5>
          <div className="d-flex align-items-center gap-3">
            <input className="form-control" placeholder="Search..." style={{width: "300px"}} />
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">Admin</button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4">
          <div className="row g-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div className="col-md-3" key={i}>
                <div className="card dashboard-card p-4 shadow-sm border-0">
                  <p className="text-muted mb-1 small">Total Analytics {i}</p>
                  <h3 className="fw-bold">2,450</h3>
                  <small className="text-success"><i className="bi bi-arrow-up"></i> 12% increase</small>
                </div>
              </div>
            ))}
          </div>

          <div className="table-container shadow-sm border-0">
            <h5 className="mb-4 fw-bold">Recent Applications</h5>
            <table className="table align-middle">
              <thead>
                <tr><th>User Name</th><th>Position</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={`https://i.pravatar.cc/40?u=${i}`} className="rounded-circle me-3" alt="user" />
                        <span>Candidate Name {i}</span>
                      </div>
                    </td>
                    <td>Senior Developer</td>
                    <td><span className="badge-soft-success">Verified</span></td>
                    <td>July 10, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;