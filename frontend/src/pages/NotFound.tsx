import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound: React.FC = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column bg-light">
      <Navbar />
      <div className="row flex-grow-1 align-items-center justify-content-center">
        <div className="col-md-6 text-center px-4">
          <div className="card shadow-lg border-0 rounded-4 p-5 bg-white">
            <div className="mb-4">
              <i className="bi bi-exclamation-triangle-fill display-1 text-warning"></i>
            </div>
            <h1 className="fw-bold display-4 text-dark">404</h1>
            <h3 className="fw-semibold text-secondary mb-3">Page Not Found</h3>
            <p className="text-muted mb-4">
              Oops! The page you are looking for might have been removed, had its
              name changed, or is temporarily unavailable.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="btn btn-primary px-4 py-2">
                <i className="bi bi-house-door me-2"></i> Go to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline-secondary px-4 py-2"
              >
                <i className="bi bi-arrow-left me-2"></i> Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;