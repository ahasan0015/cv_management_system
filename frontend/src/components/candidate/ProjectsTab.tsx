import React from "react";
import { TiptapEditor } from "../common/TiptapEditor";
import type { ProjectsTabProps } from "../../types/candidate";

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  loadingProjects,
  showAddProject,
  setShowAddProject,
  newProject,
  setNewProject,
  handleAddProject,
  handleDeleteProject,
}) => {
  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="fw-bold m-0">Projects Portfolio</h5>
        <button
          className="btn btn-primary btn-sm px-3"
          onClick={() => setShowAddProject(!showAddProject)}
        >
          <i className={`bi ${showAddProject ? "bi-x-lg" : "bi-plus-lg"} me-1`}></i>
          {showAddProject ? "Cancel" : "Add Project"}
        </button>
      </div>

      {showAddProject && (
        <form onSubmit={handleAddProject} className="card bg-light border-0 p-3 mb-4">
          <h6 className="fw-bold text-dark mb-3">New Project Details</h6>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label small fw-bold">Project Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Next Fashion E-commerce"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={newProject.date_start}
                onChange={(e) => setNewProject({ ...newProject, date_start: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={newProject.date_end}
                onChange={(e) => setNewProject({ ...newProject, date_end: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold mb-2">Project Description</label>
              <TiptapEditor
                content={newProject.markdownDescription}
                onChange={(html) => setNewProject({ ...newProject, markdownDescription: html })}
              />
            </div>
            <div className="col-12">
              <label className="form-label small fw-bold">Tags (Comma-separated)</label>
              <input
                type="text"
                className="form-control"
                placeholder="React, Laravel, Tailwind"
                value={newProject.tagsInput}
                onChange={(e) => setNewProject({ ...newProject, tagsInput: e.target.value })}
              />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-success btn-sm px-4">
                Save Project
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="row g-3">
        {loadingProjects ? (
          <p className="text-muted text-center py-3">Loading projects...</p>
        ) : projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj.id} className="col-12">
              <div className="border rounded-3 p-3 bg-white">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold text-primary mb-1">{proj.name}</h6>
                    <span className="badge bg-secondary mb-2" style={{ fontSize: "11px" }}>
                      {proj.date_start ? proj.date_start.split("T")[0] : "N/A"} to {proj.date_end ? proj.date_end.split("T")[0] : "Present"}
                    </span>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm border-0"
                    onClick={() => handleDeleteProject(proj.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
                <div 
                  className="text-muted small mb-2" 
                  dangerouslySetInnerHTML={{ __html: proj.markdown_description }}
                />
                <div className="d-flex flex-wrap gap-1">
                  {proj.tags?.map((tag: string, idx: number) => (
                    <span key={idx} className="badge bg-info text-dark" style={{ fontSize: "10px" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center py-3">No projects added yet.</p>
        )}
      </div>
    </div>
  );
};