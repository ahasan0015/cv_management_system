import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const userRole = response.data.user.role;

      login({
        token: response.data.token,
        role: userRole,
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
      });

      const normalizedRole = String(userRole).toLowerCase();

      if (normalizedRole === "candidate") {
        navigate("/candidate-profile", { replace: true });
      } else if (normalizedRole === "recruiter") {
        navigate("/recruiter-dashboard", { replace: true });
      } else {
        navigate("/admin-dashboard", { replace: true });
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(
        errorObj.response?.data?.message ||
          "Registration failed. Please check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <Navbar />
      <div className="row h-100">
        <div className="col-lg-6 d-none d-lg-flex bg-primary text-white align-items-center justify-content-center">
          <div className="text-center px-5">
            <i className="bi bi-person-plus-fill display-1 mb-4"></i>
            <h1 className="fw-bold">Join Our Platform</h1>
            <p className="lead mt-3">
              Create your account today to build professional CVs and kickstart
              your career journey.
            </p>
          </div>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">
          <div
            className="card shadow-lg border-0 rounded-4 p-4"
            style={{ width: "430px" }}
          >
            <form className="card-body" onSubmit={handleRegister}>
              <div className="text-center mb-4">
                <i className="bi bi-person-badge display-4 text-primary"></i>
                <h2 className="fw-bold mt-3">Create Account</h2>
                <p className="text-muted">Sign up for a new account</p>
              </div>

              {error && (
                <div className="alert alert-danger p-2 text-center small">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-2"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <hr />
              <div className="text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-decoration-none fw-bold ms-2"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;