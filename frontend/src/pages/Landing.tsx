import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const featuredJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Northstar Labs',
    location: 'Remote • USA',
    type: 'Full-time',
    salary: '$120k - $150k',
    tag: 'React',
    description: 'Lead the product experience for a fast-growing SaaS team building AI-driven dashboards.',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    title: 'UI/UX Product Designer',
    company: 'PixelCraft Studio',
    location: 'Dhaka • Hybrid',
    type: 'Contract',
    salary: '$70k - $95k',
    tag: 'Design',
    description: 'Create elegant, conversion-focused digital experiences for global clients and startups.',
    logo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    title: 'Talent Acquisition Specialist',
    company: 'BrightHire',
    location: 'Remote • Global',
    type: 'Full-time',
    salary: '$60k - $80k',
    tag: 'HR',
    description: 'Support hiring strategy, employer branding, and high-impact recruitment campaigns.',
    logo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Chattogram • On-site',
    type: 'Full-time',
    salary: '$90k - $115k',
    tag: 'Node.js',
    description: 'Build reliable APIs and data pipelines that power analytics for enterprise customers.',
    logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=200&q=80',
  },
];

const Landing = () => {
  return (
    <div className="landing-page bg-light">
      <Navbar />
      <Hero />

      <div className="container py-5" id="jobs">
        <SearchBar />

        <div className="row g-4 align-items-start">
          <div className="col-lg-8">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-2">
              <div>
                <h2 className="fw-bold mb-1">Featured opportunities</h2>
                <p className="text-muted mb-0">Curated roles for professionals who want to grow with modern companies.</p>
              </div>
              <a href="/login" className="btn btn-outline-primary rounded-pill">
                Explore all jobs
              </a>
            </div>

            <div className="row g-4">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3">Why professionals choose us</h5>
              <ul className="list-unstyled mb-0">
                <li className="d-flex gap-2 mb-3">
                  <i className="bi bi-check-circle-fill text-success mt-1"></i>
                  <span>Smart job matching tailored to your skills and goals.</span>
                </li>
                <li className="d-flex gap-2 mb-3">
                  <i className="bi bi-check-circle-fill text-success mt-1"></i>
                  <span>Recruiter-friendly CV templates with instant editing tools.</span>
                </li>
                <li className="d-flex gap-2">
                  <i className="bi bi-check-circle-fill text-success mt-1"></i>
                  <span>Fast-track your applications and stand out from the crowd.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;