import React from 'react';

export interface JobItem {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tag: string;
  description: string;
  logo: string;
}

interface JobCardProps {
  job: JobItem;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="col-md-6">
      <div className="card border-0 shadow-sm rounded-4 p-4 h-100 position-relative hover-shadow transition">
        <div className="d-flex align-items-start gap-3 mb-3">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="rounded-3 object-fit-cover" 
            width="50" 
            height="50" 
          />
          <div>
            <span className="badge bg-primary-subtle text-primary mb-1 rounded-pill px-3 py-1 fw-semibold">
              {job.tag}
            </span>
            <h5 className="fw-bold text-dark mb-0">{job.title}</h5>
            <small className="text-muted">{job.company}</small>
          </div>
        </div>

        <p className="text-secondary small mb-3 line-clamp-2">
          {job.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-light text-secondary border">
            <i className="bi bi-geo-alt me-1"></i> {job.location}
          </span>
          <span className="badge bg-light text-secondary border">
            <i className="bi bi-briefcase me-1"></i> {job.type}
          </span>
          <span className="badge bg-light text-secondary border">
            <i className="bi bi-calendar-event me-1"></i> {job.salary}
          </span>
        </div>

        <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
          <span className="text-muted small">ID: #{job.id}</span>
          <a href={`/positions/${job.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;