// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/Navbar";

const RecruterDashboard = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

  const menuItems = [
    { name: "Overview", icon: "bi-speedometer2", active: true },
    { name: "CVs", icon: "bi-file-earmark-person" },
    { name: "Candidates", icon: "bi-people" },
    { name: "Jobs", icon: "bi-briefcase" },
    { name: "Interviews", icon: "bi-calendar2-week" },
    { name: "Reports", icon: "bi-bar-chart-line" },
  ];

  const stats = [
    { title: "Active Job Posts", value: "48", subtitle: "+6 this month", color: "primary" },
    { title: "CV Downloads", value: "1,240", subtitle: "+18% stronger", color: "success" },
    { title: "Scheduled Interviews", value: "24", subtitle: "4 today", color: "warning" },
    { title: "Hired Candidates", value: "14", subtitle: "+2 this week", color: "info" },
  ];

  const applications = [
    { name: "Nadia Rahman", role: "Frontend Developer", status: "Shortlisted", date: "Today" },
    { name: "Arif Hossain", role: "React Engineer", status: "Interview", date: "Tomorrow" },
    { name: "Mim Akter", role: "UI/UX Designer", status: "Pending", date: "2 days ago" },
  ];

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

  return (
    <div className="min-vh-100 bg-light">
        <Navbar/>
      <div className="d-flex flex-column flex-lg-row">
        <div className="d-lg-none p-3 bg-white border-bottom">
          <button
            className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#recruiterSidebar"
            aria-controls="recruiterSidebar"
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
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                <i className="bi bi-briefcase-fill"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold">JobPortal</h5>
                <small className="text-muted">Recruiter Hub</small>
              </div>
            </div>
          </div>

          <nav className="p-3">
            <div className="d-flex flex-wrap flex-lg-column gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`btn text-start d-flex align-items-center justify-content-start flex-grow-1 flex-lg-grow-0 ${item.active ? "btn-primary text-white" : "btn-light text-muted"}`}
                  onClick={() => {
                    const offcanvas = document.getElementById("recruiterSidebar");
                    if (offcanvas) {
                      const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvas);
                      bsOffcanvas?.hide();
                    }
                  }}
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
                <h6 className="fw-bold mb-1">Grow your hiring pipeline</h6>
                <p className="small text-muted mb-2">Create better CV-driven campaigns for top talent.</p>
                <button className="btn btn-outline-primary btn-sm">Upgrade Plan</button>
              </div>
            </div>
          </div>
        </aside>

        <div className="offcanvas offcanvas-start" tabIndex={-1} id="recruiterSidebar" aria-labelledby="recruiterSidebarLabel">
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title fw-bold" id="recruiterSidebarLabel">Recruiter Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body p-0">
            <div className="p-3 p-lg-4 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                  <i className="bi bi-briefcase-fill"></i>
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">JobPortal</h5>
                  <small className="text-muted">Recruiter Hub</small>
                </div>
              </div>
            </div>

            <nav className="p-3">
              <div className="d-flex flex-column gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`btn text-start d-flex align-items-center justify-content-start ${item.active ? "btn-primary text-white" : "btn-light text-muted"}`}
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
                  <h6 className="fw-bold mb-1">Grow your hiring pipeline</h6>
                  <p className="small text-muted mb-2">Create better CV-driven campaigns for top talent.</p>
                  <button className="btn btn-outline-primary btn-sm">Upgrade Plan</button>
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
                      <small className="text-muted">{item.subtitle}</small>
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
                      <h5 className="fw-bold mb-0">Recent Applications</h5>
                      <button className="btn btn-sm btn-outline-primary">View All</button>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle mb-0">
                        <thead>
                          <tr>
                            <th>Candidate</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((app) => (
                            <tr key={app.name}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <img src={`https://i.pravatar.cc/36?u=${app.name}`} className="rounded-circle" alt="candidate" />
                                  <span className="fw-semibold">{app.name}</span>
                                </div>
                              </td>
                              <td>{app.role}</td>
                              <td>
                                <span className={`badge ${app.status === "Shortlisted" ? "bg-success-subtle text-success" : app.status === "Interview" ? "bg-warning-subtle text-warning" : "bg-secondary-subtle text-secondary"}`}>
                                  {app.status}
                                </span>
                              </td>
                              <td className="text-muted">{app.date}</td>
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
                    <button className="btn btn-primary w-100 mb-2">Post New Job</button>
                    <button className="btn btn-outline-primary w-100 mb-2">Review CVs</button>
                    <button className="btn btn-outline-secondary w-100">Schedule Interview</button>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Upcoming Interviews</h5>
                    <div className="d-flex align-items-center justify-content-between border-bottom py-2">
                      <div>
                        <div className="fw-semibold">Sarah Khan</div>
                        <small className="text-muted">10:30 AM</small>
                      </div>
                      <span className="badge bg-primary-subtle text-primary">Online</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom py-2">
                      <div>
                        <div className="fw-semibold">Rahim Uddin</div>
                        <small className="text-muted">1:00 PM</small>
                      </div>
                      <span className="badge bg-success-subtle text-success">Onsite</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-2">
                      <div>
                        <div className="fw-semibold">Maliha Noor</div>
                        <small className="text-muted">3:30 PM</small>
                      </div>
                      <span className="badge bg-info-subtle text-info">HR</span>
                    </div>
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

export default RecruterDashboard;