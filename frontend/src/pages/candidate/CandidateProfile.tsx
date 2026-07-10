import Navbar from "../../components/Navbar";

const CandidateProfile = () => {
  return (
    <div className="container py-5">
        <Navbar />
      <div className="row">
        {/* profile side bar */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center">
            <img 
              src="https://via.placeholder.com/150" 
              className="rounded-circle mx-auto mb-3" 
              alt="Profile" 
            />
            <h4 className="fw-bold">Md. Candidate Name</h4>
            <p className="text-muted">Software Developer</p>
            <button className="btn btn-primary w-100 mb-2">Edit Profile</button>
            <button className="btn btn-outline-primary w-100">Download CV</button>
          </div>
        </div>

        {/* main info */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">About Me</h5>
            <p className="text-muted">
              I am a passionate software developer with experience in React, Node.js, and Laravel. 
              Always looking for new challenges and opportunities to grow.
            </p>
          </div>

          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-secondary p-2">React.js</span>
              <span className="badge bg-secondary p-2">Laravel</span>
              <span className="badge bg-secondary p-2">TypeScript</span>
              <span className="badge bg-secondary p-2">Bootstrap</span>
            </div>
          </div>

          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">Experience</h5>
            <div className="mb-3">
              <h6 className="fw-bold">Frontend Developer</h6>
              <p className="text-muted mb-1">Tech Firm Ltd. | 2024 - Present</p>
              <p className="small">Working on enterprise-level web applications using React and Bootstrap.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;