
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import type { JobItem } from '../components/JobCard';
import type { DashboardApiResponse, DashboardStats } from '../types/landing';
import { useEffect, useState } from 'react';
import api from '../config/axios';
import JobCard from '../components/JobCard';




const Landing: React.FC = () => {
  const [latestJobs, setLatestJobs] = useState<JobItem[]>([]);
  const [popularJobs, setPopularJobs] = useState<JobItem[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_positions: 0,
    total_candidates: 0,
    total_projects: 0,
    total_users: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // সার্চ এবং লোকেশন ফিল্টার স্টেট
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    api.get<DashboardApiResponse>('/dashboard')
      .then((response) => {
        if (response.data.success) {
          const apiData = response.data.data;

          const formattedLatest: JobItem[] = apiData.latest_positions.map((pos) => ({
            id: pos.id,
            title: pos.title,
            company: pos.access_rules?.roles?.[0] ? `${pos.access_rules.roles[0]} Role` : 'Open Position',
            location: 'Dhaka', // ডিফল্ট লোকেশন বা আপনার লজিক অনুযায়ী
            type: pos.access_rules?.min_experience === 0 ? 'Entry Level' : `${pos.access_rules.min_experience}+ Years Exp`,
            salary: `Start: ${new Date(pos.start_date).toLocaleDateString()}`,
            tag: pos.project_tags?.[0] || 'General',
            description: pos.description,
            logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200&q=80',
          }));

          const formattedPopular: JobItem[] = apiData.popular_positions.map((pos) => ({
            id: pos.id,
            title: pos.title,
            company: pos.access_rules?.roles?.[0] ? `${pos.access_rules.roles[0]} Role` : 'Open Position',
            location: 'Remote',
            type: pos.access_rules?.min_experience === 0 ? 'Entry Level' : `${pos.access_rules.min_experience}+ Years Exp`,
            salary: `Start: ${new Date(pos.start_date).toLocaleDateString()}`,
            tag: pos.project_tags?.[0] || 'General',
            description: pos.description,
            logo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=200&q=80',
          }));

          setLatestJobs(formattedLatest);
          setPopularJobs(formattedPopular);
          setStats(apiData.stats);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      });
  }, []);

  // Job title  Location 
  const filteredLatestJobs = latestJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = location === '' || job.location.toLowerCase() === location.toLowerCase();

    return matchesSearch && matchesLocation;
  });

  const filteredPopularJobs = popularJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = location === '' || job.location.toLowerCase() === location.toLowerCase();

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="landing-page bg-light">
      <Navbar />
      <Hero />

      {/* Stats Section */}
      <div className="container py-4">
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm rounded-4">
              <h3 className="fw-bold text-primary">{stats.total_positions}</h3>
              <p className="text-muted mb-0">Total Positions</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm rounded-4">
              <h3 className="fw-bold text-success">{stats.total_candidates}</h3>
              <p className="text-muted mb-0">Candidates</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm rounded-4">
              <h3 className="fw-bold text-warning">{stats.total_projects}</h3>
              <p className="text-muted mb-0">Total Projects</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm rounded-4">
              <h3 className="fw-bold text-info">{stats.total_users}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" id="jobs">
        {/* SearchBar */}
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          location={location} 
          setLocation={setLocation} 
        />

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

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredLatestJobs.length > 0 ? (
              <div className="row g-4">
                {filteredLatestJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <p className="text-muted mb-0">No opportunities found matching your criteria.</p>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3">Popular Positions</h5>
              <ul className="list-unstyled mb-0">
                {filteredPopularJobs.slice(0, 3).map((job) => (
                  <li key={job.id} className="mb-3 pb-2 border-bottom">
                    <span className="fw-semibold text-dark d-block">{job.title}</span>
                    <small className="text-muted">{job.description.substring(0, 60)}...</small>
                  </li>
                ))}
                {filteredPopularJobs.length === 0 && (
                  <small className="text-muted">No popular positions found.</small>
                )}
              </ul>
            </div>

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