type JobCardProps = {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    tag: string;
    description: string;
    logo: string;
  };
};

const JobCard = ({ job }: JobCardProps) => (
  <div className="col-md-6">
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-3">
            <img src={job.logo} alt={job.company} className="rounded-circle" style={{ width: 48, height: 48, objectFit: "cover" }} />
            <div>
              <h5 className="fw-bold mb-1">{job.title}</h5>
              <p className="text-muted mb-0">{job.company}</p>
            </div>
          </div>
          <span className="badge bg-primary-subtle text-primary">{job.tag}</span>
        </div>

        <p className="text-muted mb-3">{job.description}</p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-light text-dark">{job.type}</span>
          <span className="badge bg-light text-dark">{job.location}</span>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <span className="fw-semibold text-primary">{job.salary}</span>
          <button className="btn btn-outline-primary btn-sm rounded-pill">Apply now</button>
        </div>
      </div>
    </div>
  </div>
);

export default JobCard;