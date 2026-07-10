const SearchBar = () => (
  <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
    <div className="row g-3 align-items-end">
      <div className="col-lg-5">
        <label className="form-label fw-semibold">Job title</label>
        <input type="text" className="form-control rounded-pill" placeholder="Software Engineer, Designer, HR..." />
      </div>
      <div className="col-lg-4">
        <label className="form-label fw-semibold">Location</label>
        <select className="form-select rounded-pill">
          <option>Remote</option>
          <option>Dhaka</option>
          <option>Chattogram</option>
          <option>Anywhere</option>
        </select>
      </div>
      <div className="col-lg-3">
        <button className="btn btn-primary rounded-pill w-100 fw-semibold">Search jobs</button>
      </div>
    </div>

    <div className="mt-3 d-flex flex-wrap gap-2">
      <span className="badge bg-light text-dark px-3 py-2">React</span>
      <span className="badge bg-light text-dark px-3 py-2">UI/UX</span>
      <span className="badge bg-light text-dark px-3 py-2">Remote</span>
      <span className="badge bg-light text-dark px-3 py-2">Full-time</span>
    </div>
  </div>
);

export default SearchBar;