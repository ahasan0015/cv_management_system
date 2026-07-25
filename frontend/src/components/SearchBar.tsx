import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, location, setLocation }) => {
  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
      <div className="row g-3 align-items-end">
        <div className="col-lg-5">
          <label className="form-label fw-semibold">Job title</label>
          <input 
            type="text" 
            className="form-control rounded-pill" 
            placeholder="Software Engineer, Designer, HR..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-lg-4">
          <label className="form-label fw-semibold">Location</label>
          <select 
            className="form-select rounded-pill"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Anywhere</option>
            <option value="Remote">Remote</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>
        </div>
        <div className="col-lg-3">
          <button className="btn btn-primary rounded-pill w-100 fw-semibold" type="button">
            Search jobs
          </button>
        </div>
      </div>

      <div className="mt-3 d-flex flex-wrap gap-2">
        {['React', 'UI/UX', 'Remote', 'Full-time'].map((tag) => (
          <span 
            key={tag}
            className="badge bg-light text-dark px-3 py-2" 
            style={{ cursor: 'pointer', transition: '0.2s' }}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;