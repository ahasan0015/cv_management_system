import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <h1>Hello Roxy</h1>
      <div className="container my-5">
        <SearchBar />
        <h2 className="mb-4">Featured Jobs</h2>
        <div className="row">
          {/* Job Data Fetching Logic Here */}
          <JobCard />
          <JobCard />
          
        </div>
      </div>
    </div>
  );
};
export default Landing;