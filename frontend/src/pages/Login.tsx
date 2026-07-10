import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      // user role variable
      const userRole = response.data.user.role;

      // login contex send data
      login({
        token: response.data.token,
        role: userRole,
        id: response.data.user.id,
        name: response.data.user.name,
      });

      const normalizedRole = String(userRole).toLowerCase();

      if (normalizedRole === "candidate") {
        navigate("/candidate-profile", { replace: true });
      } else if (normalizedRole === "recruiter") {
        navigate("/recruiter-dashboard", { replace: true });
      } else {
        navigate("/admin-dashboard", { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <Navbar/>
      <div className="row h-100">
        {/* Left Side */}
        <div className="col-lg-6 d-none d-lg-flex bg-primary text-white align-items-center justify-content-center">
          <div className="text-center px-5">
            <i className="bi bi-briefcase-fill display-1 mb-4"></i>
            <h1 className="fw-bold">CV Maker & Job Portal</h1>
            <p className="lead mt-3">
              Create professional CVs, explore thousands of jobs, and connect
              with top employers.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">
          <div
            className="card shadow-lg border-0 rounded-4 p-4"
            style={{ width: "430px" }}
          >
            {/* Form wrapping */}
            <form className="card-body" onSubmit={handleLogin}>
              <div className="text-center mb-4">
                <i className="bi bi-person-circle display-4 text-primary"></i>
                <h2 className="fw-bold mt-3">Welcome Back</h2>
                <p className="text-muted">Login to your account</p>
              </div>

              {error && (
                <div className="alert alert-danger p-2 text-center">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">Remember Me</label>
                </div>
                <a href="#" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center my-4">
                <span className="text-muted">OR</span>
              </div>

             
              {/* Social Login - Updated Button */}
              <a
                href="http://localhost:8000/auth/google"
                className="btn btn-outline-danger w-100 mb-2 text-decoration-none"
              >
                <i className="bi bi-google me-2"></i> Continue with Google
              </a>
              <button
                type="button"
                className="btn btn-outline-primary w-100 mb-2"
              >
                <i className="bi bi-facebook me-2"></i> Continue with Facebook
              </button>
              <button type="button" className="btn btn-outline-dark w-100">
                <i className="bi bi-github me-2"></i> Continue with GitHub
              </button>

              <hr />
              <div className="text-center">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-decoration-none fw-bold ms-2"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
