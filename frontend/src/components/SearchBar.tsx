const SearchBar = () => (
  <div className="card shadow-sm p-4 my-4">
    <div className="row g-2">
      <div className="col-md-8">
        <input type="text" className="form-control" placeholder="Job title or keywords..." />
      </div>
      <div className="col-md-4">
        <button className="btn btn-primary w-100">Search Jobs</button>
      </div>
    </div>
  </div>
);
export default SearchBar;