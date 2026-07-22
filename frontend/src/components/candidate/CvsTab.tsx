import React from "react";

interface CvsTabProps {
  onUpload: () => void;
}

export const CvsTab: React.FC<CvsTabProps> = ({ onUpload }) => {
  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <h5 className="fw-bold border-bottom pb-2 mb-3">CVs & Resumes</h5>
      <div className="border border-dashed p-4 text-center rounded-3 bg-light">
        <i className="bi bi-cloud-arrow-up display-6 text-secondary mb-2"></i>
        <p className="mb-2 small text-muted">Upload or update your professional resume (PDF, DOCX)</p>
        <input 
          type="file" 
          className="form-control form-control-sm w-50 mx-auto" 
          onChange={onUpload}
        />
      </div>
    </div>
  );
};