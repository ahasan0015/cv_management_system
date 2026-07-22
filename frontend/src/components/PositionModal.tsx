import { useState } from "react";
import type { ExtendedPosition, PositionFormData, PositionModalProps } from "../types/positionModal";

const AVAILABLE_TAGS = ["React", "Laravel", "TypeScript", "Tailwind", "Node.js", "MySQL", "Docker", "Bootstrap", "Next.js", "Vue.js"];
const AVAILABLE_ROLES = ["Frontend Dev", "Backend Dev", "Full-Stack Dev", "UI/UX Designer", "DevOps Engineer", "QA Tester"];

export const PositionModal = ({
  show,
  onClose,
  onSave,
  isSubmitting,
  attributesList = [],
  initialData,
}: PositionModalProps) => {
  const typedInitialData = initialData as ExtendedPosition | null;

  // Helper functions for initial states
  const getInitialAttributes = (): number[] => {
    if (typedInitialData?.attributes_ids) return typedInitialData.attributes_ids;
    if (Array.isArray(typedInitialData?.attributes)) {
      return typedInitialData.attributes.map((attr) => {
        if (typeof attr === "object" && attr !== null && "id" in attr) {
          return (attr as { id: number }).id;
        }
        return Number(attr);
      }).filter((id) => !isNaN(id));
    }
    return [];
  };

  const getInitialTags = (): string[] => {
    if (Array.isArray(typedInitialData?.project_tags)) return typedInitialData.project_tags;
    if (typeof typedInitialData?.project_tags === "string" && typedInitialData.project_tags.trim() !== "") {
      return typedInitialData.project_tags.split(",").map((t) => t.trim());
    }
    return [];
  };

  const getInitialAccessRules = () => {
    let parsedExp = 1;
    let parsedRoles: string[] = [];
    if (typeof typedInitialData?.access_rules === "object" && typedInitialData.access_rules !== null) {
      parsedExp = typedInitialData.access_rules.min_experience || 1;
      parsedRoles = typedInitialData.access_rules.roles || [];
    } else if (typeof typedInitialData?.access_rules === "string" && typedInitialData.access_rules.trim() !== "") {
      try {
        const json = JSON.parse(typedInitialData.access_rules);
        parsedExp = json.min_experience || 1;
        parsedRoles = json.roles || [];
      } catch {
        // Fallback
      }
    }
    return { parsedExp, parsedRoles };
  };

  const initialRules = getInitialAccessRules();

  const [form, setForm] = useState<PositionFormData>({
    title: typedInitialData?.title || "",
    description: typedInitialData?.description || "",
    max_project_count: typedInitialData?.max_project_count || 1,
    start_date: typedInitialData?.start_date || "",
    end_date: typedInitialData?.end_date || "",
    attributes: [],
    access_rules: "",
    project_tags: "",
  });

  const [selectedAttributeIds, setSelectedAttributeIds] = useState<number[]>(getInitialAttributes);
  const [attributeInput, setAttributeInput] = useState("");
  const [showAttributeDropdown, setShowAttributeDropdown] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>(getInitialTags);
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  
  const [minExp, setMinExp] = useState<number>(initialRules.parsedExp);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRules.parsedRoles);
  const [roleInput, setRoleInput] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  //EARLY RETURN IS NOW PLACED AFTER ALL HOOKS
  if (!show) return null;

  // Sync interactive states back to form before saving
  const handleSaveClick = () => {
    const accessRulesObj = {
      min_experience: Number(minExp),
      roles: selectedRoles,
    };

    const finalData: PositionFormData = {
      ...form,
      attributes: selectedAttributeIds,
      project_tags: selectedTags.join(", "),
      access_rules: JSON.stringify(accessRulesObj),
    };

    onSave(finalData, initialData?.id);
  };

  // Attribute helpers
  const addAttribute = (id: number) => {
    if (!selectedAttributeIds.includes(id)) {
      setSelectedAttributeIds([...selectedAttributeIds, id]);
    }
    setAttributeInput("");
    setShowAttributeDropdown(false);
  };

  const removeAttribute = (idToRemove: number) => {
    setSelectedAttributeIds(selectedAttributeIds.filter((id) => id !== idToRemove));
  };

  // Tag helpers
  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput("");
    setShowTagDropdown(false);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tagToRemove));
  };

  // Role helpers
  const addRole = (role: string) => {
    if (role && !selectedRoles.includes(role)) {
      setSelectedRoles([...selectedRoles, role]);
    }
    setRoleInput("");
    setShowRoleDropdown(false);
  };

  const removeRole = (roleToRemove: string) => {
    setSelectedRoles(selectedRoles.filter((r) => r !== roleToRemove));
  };

  // Filtered suggestions
  const filteredAttributes = attributesList.filter(
    (attr) =>
      attr.name.toLowerCase().includes(attributeInput.toLowerCase()) &&
      !selectedAttributeIds.includes(attr.id)
  );

  const filteredTags = AVAILABLE_TAGS.filter(
    (t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !selectedTags.includes(t)
  );

  const filteredRoles = AVAILABLE_ROLES.filter(
    (r) => r.toLowerCase().includes(roleInput.toLowerCase()) && !selectedRoles.includes(r)
  );

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">
              {initialData ? "Edit Position" : "Add New Position"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {/* Title Input */}
            <div className="mb-3">
              <label className="form-label small fw-bold">Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Senior Frontend Developer"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="mb-3">
              <label className="form-label small fw-bold">Description</label>
              <textarea
                className="form-control"
                placeholder="Enter role description..."
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* Max Project Count & Dates */}
            <div className="row mb-3">
              <div className="col-md-4 mb-2 mb-md-0">
                <label className="form-label small fw-bold">Max Project Count *</label>
                <input
                  type="number"
                  className="form-control"
                  min={1}
                  value={form.max_project_count}
                  onChange={(e) => setForm({ ...form, max_project_count: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="col-md-4 mb-2 mb-md-0">
                <label className="form-label small fw-bold">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
            </div>

            {/* Attributes Auto-suggestion UI */}
            <div className="mb-3 position-relative">
              <label className="form-label small fw-bold">Attributes (Auto-suggestion)</label>
              
              {/* Selected Attribute Chips */}
              <div className="d-flex flex-wrap gap-1 mb-2">
                {selectedAttributeIds.map((id) => {
                  const attrObj = attributesList.find((a) => a.id === id);
                  return (
                    <span key={id} className="badge bg-info text-dark d-flex align-items-center gap-1 px-2 py-1">
                      {attrObj ? attrObj.name : `ID: ${id}`}
                      <button
                        type="button"
                        className="btn-close"
                        style={{ fontSize: "9px" }}
                        onClick={() => removeAttribute(id)}
                      />
                    </span>
                  );
                })}
              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Type attribute name to search..."
                value={attributeInput}
                onChange={(e) => {
                  setAttributeInput(e.target.value);
                  setShowAttributeDropdown(true);
                }}
                onFocus={() => setShowAttributeDropdown(true)}
              />

              {/* Dropdown Suggestions for Attributes */}
              {showAttributeDropdown && filteredAttributes.length > 0 && (
                <ul className="dropdown-menu show w-100 shadow-sm mt-1" style={{ maxHeight: "150px", overflowY: "auto" }}>
                  {filteredAttributes.map((attr) => (
                    <li key={attr.id}>
                      <button
                        type="button"
                        className="dropdown-item py-1"
                        onClick={() => addAttribute(attr.id)}
                      >
                        {attr.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <hr className="my-4" />

            {/* Access Rules Builder UI */}
            <div className="card bg-light border-0 p-3 mb-3">
              <h6 className="fw-bold text-dark mb-3">Access Rules Configuration</h6>
              
              {/* Min Experience */}
              <div className="mb-3">
                <label className="form-label small fw-bold">Minimum Experience (Years)</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  value={minExp}
                  onChange={(e) => setMinExp(Number(e.target.value))}
                />
              </div>

              {/* Roles Autocomplete */}
              <div className="position-relative">
                <label className="form-label small fw-bold">Allowed Roles (Auto-suggestion)</label>
                
                {/* Selected Role Chips */}
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {selectedRoles.map((role, idx) => (
                    <span key={idx} className="badge bg-success d-flex align-items-center gap-1 px-2 py-1">
                      {role}
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{ fontSize: "9px" }}
                        onClick={() => removeRole(role)}
                      />
                    </span>
                  ))}
                </div>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Type role name (e.g. Frontend Dev)..."
                  value={roleInput}
                  onChange={(e) => {
                    setRoleInput(e.target.value);
                    setShowRoleDropdown(true);
                  }}
                  onFocus={() => setShowRoleDropdown(true)}
                />

                {/* Dropdown Suggestions for Roles */}
                {showRoleDropdown && filteredRoles.length > 0 && (
                  <ul className="dropdown-menu show w-100 shadow-sm mt-1" style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {filteredRoles.map((role, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="dropdown-item py-1"
                          onClick={() => addRole(role)}
                        >
                          {role}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Project Tags Auto-suggestion UI */}
            <div className="mb-3 position-relative">
              <label className="form-label small fw-bold">Project Tags (Auto-suggestion)</label>
              
              {/* Selected Tag Chips */}
              <div className="d-flex flex-wrap gap-1 mb-2">
                {selectedTags.map((tag, idx) => (
                  <span key={idx} className="badge bg-primary d-flex align-items-center gap-1 px-2 py-1">
                    {tag}
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      style={{ fontSize: "9px" }}
                      onClick={() => removeTag(tag)}
                    />
                  </span>
                ))}
              </div>

              <input
                type="text"
                className="form-control"
                placeholder="Type tag name (e.g. React, Laravel)..."
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setShowTagDropdown(true);
                }}
                onFocus={() => setShowTagDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) {
                    e.preventDefault();
                    addTag(tagInput.trim());
                  }
                }}
              />

              {/* Dropdown Suggestions for Tags */}
              {showTagDropdown && filteredTags.length > 0 && (
                <ul className="dropdown-menu show w-100 shadow-sm mt-1" style={{ maxHeight: "150px", overflowY: "auto" }}>
                  {filteredTags.map((tag, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        className="dropdown-item py-1"
                        onClick={() => addTag(tag)}
                      >
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <small className="text-muted d-block mt-1">Type and select from dropdown or press Enter.</small>
            </div>
          </div>

          <div className="modal-footer bg-light">
            <button
              className="btn btn-secondary px-4"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-4"
              disabled={isSubmitting}
              onClick={handleSaveClick}
            >
              {isSubmitting ? "Saving..." : "Save Position"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};