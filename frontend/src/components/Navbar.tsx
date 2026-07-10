import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary" href="/">JobPortal</a>
        
        <div className="navbar-nav ms-auto">
          <a className="nav-link" href="/">Home</a>
          
          {user ? (
            // if user login show dropdown
            <div className="dropdown ms-3">
              <button 
                className="btn btn-outline-primary dropdown-toggle" 
                type="button" 
                id="userDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {user.name} {/*user name */}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // if user not login
            <a className="nav-link btn btn-outline-primary ms-2" href="/login">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;