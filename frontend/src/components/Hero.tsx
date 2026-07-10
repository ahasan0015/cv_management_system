const Hero = () => (
  <section className="py-5 py-lg-6 text-white" style={{ background: "linear-gradient(135deg, #0f4c81 0%, #2563eb 100%)" }}>
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <span className="badge rounded-pill bg-white text-primary px-3 py-2 mb-3 fw-semibold">
            CV + Career Platform
          </span>
          <h1 className="display-5 fw-bold mb-3">
            Build your CV and land your next opportunity faster.
          </h1>
          <p className="lead text-light mb-4">
            Discover curated jobs, create a polished professional profile, and connect with top recruiters in one place.
          </p>
          <div className="d-flex flex-wrap gap-3 mb-4">
            <a href="/login" className="btn btn-light text-primary fw-semibold rounded-pill px-4">
              Get started
            </a>
            <a href="#jobs" className="btn btn-outline-light rounded-pill px-4">
              Browse jobs
            </a>
          </div>
          <div className="d-flex flex-wrap gap-4 text-white-50 small">
            <div>
              <strong className="d-block text-white">10k+</strong>
              CVs created
            </div>
            <div>
              <strong className="d-block text-white">4.9/5</strong>
              recruiter rating
            </div>
            <div>
              <strong className="d-block text-white">24/7</strong>
              opportunity matching
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Professional team reviewing resumes"
              className="card-img-top"
              style={{ height: 240, objectFit: "cover" }}
            />
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge bg-primary-subtle text-primary">Resume Ready</span>
                <span className="text-success fw-semibold">+92 score</span>
              </div>
              <h5 className="fw-bold mb-2">Stand out with an ATS-friendly CV</h5>
              <p className="text-muted mb-0">
                Designed for candidates who want professional visibility and strong recruiter matches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;