import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { candidateService } from "../../services/candidateService";
import { attributeService } from "../../services/attributeService";
import type { 
  DynamicCvTabProps, 
  ProfileState,
  GenderType, 
  MaritalStatusType, 
  BloodGroupType 
} from "../../types/candidate";

export const DynamicCvTab: React.FC<DynamicCvTabProps> = ({
  profile,
  projects,
  hasPermission = true,
}) => {
  const [isPublished, setIsPublished] = useState<boolean>(
    profile?.is_published ?? false,
  );
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [editableData, setEditableData] = useState<ProfileState>(profile);
  const [prevProfile, setPrevProfile] = useState<ProfileState>(profile);
  
  // Dynamic Attributes State
  const [attributes, setAttributes] = useState<any[]>(
    profile?.available_attributes || []
  );
  const [loadingAttrs, setLoadingAttrs] = useState<boolean>(false);

  // Fetch Custom Attributes on Mount if not present in profile
  useEffect(() => {
    const fetchAttributes = async () => {
      if (profile?.available_attributes && profile.available_attributes.length > 0) {
        setAttributes(profile.available_attributes);
        return;
      }

      try {
        setLoadingAttrs(true);
        const response = await attributeService.getAll();
        
        const resData = response?.data;
        const attrList = Array.isArray(resData)
          ? resData
          : Array.isArray(resData?.data)
            ? resData.data
            : Array.isArray(response)
              ? response
              : [];

        setAttributes(attrList);
      } catch (error) {
        console.error("Failed to fetch custom attributes", error);
        toast.error("Failed to load custom attributes.");
      } finally {
        setLoadingAttrs(false);
      }
    };

    fetchAttributes();
  }, [profile]);

  if (profile !== prevProfile) {
    setPrevProfile(profile);
    setEditableData(profile);
    setIsPublished(profile?.is_published ?? false);
    if (profile?.available_attributes) {
      setAttributes(profile.available_attributes);
    }
  }

  if (!hasPermission) {
    return (
      <div className="card shadow-sm border-0 p-4 text-center">
        <div className="alert alert-danger mb-0">
          <i className="bi bi-lock-fill me-2"></i>
          <strong>Access Denied:</strong> You do not have permission to view or
          generate the CV.
        </div>
      </div>
    );
  }

  // Publish / Private Toggle
  const handlePublishToggle = async () => {
    const newStatus = !isPublished;
    setIsPublished(newStatus);

    try {
      await candidateService.updateProfile({ is_published: newStatus });
      toast.success(
        newStatus ? "CV is now Published (Public)!" : "CV is now Private!",
      );
    } catch (error) {
      console.error("Failed to update publish status", error);
      setIsPublished(!newStatus);
      toast.error("Failed to update publish status.");
    }
  };

  // General Field Change Handler (for root properties like name, email, title, bio, etc.)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditableData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Dynamic Attribute Handler (for custom attributes stored inside info)
  const handleAttributeChange = (key: string, value: any) => {
    setEditableData((prev: any) => ({
      ...prev,
      info: {
        ...(prev.info || {}),
        [key]: value,
      },
      attributes: { // Syncing both representations if backend uses either info or attributes
        ...(prev.attributes || prev.info || {}),
        [key]: value,
      }
    }));
  };

  // Filter out profile summary and image/avatar attributes from the list
  const attributesList = (attributes || []).filter(
    (attr: any) => 
      attr.name.toLowerCase() !== "profile summary" && 
      attr.attribute_type?.slug !== "markdown" &&
      !attr.name.toLowerCase().includes("image") &&
      !attr.name.toLowerCase().includes("avatar")
  );

  // Type wise option lists
  const genderOptions: GenderType[] = ["Male", "Female", "Other"];
  const maritalStatusOptions: MaritalStatusType[] = ["Single", "Married", "Divorced"];
  const bloodGroupOptions: BloodGroupType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const getDropdownOptions = (attributeName: string): string[] => {
    const name = attributeName.toLowerCase();
    if (name.includes("gender")) return genderOptions;
    if (name.includes("marital")) return maritalStatusOptions;
    if (name.includes("blood")) return bloodGroupOptions;
    return ["Option 1"];
  };

  // Quick Edit / Done Editing Handle & Save to Backend
  const handleToggleEdit = async () => {
    if (isEditable) {
      try {
        // Map info to attributes payload as expected by backend repository updateProfile
        const payload = {
          ...editableData,
          attributes: editableData.info || editableData.attributes || {}
        };
        await candidateService.updateProfile(payload);
        toast.success("CV information updated successfully!");
      } catch (error: any) {
        console.error("Failed to update profile", error);
        toast.error(error.response?.data?.message || "Failed to save changes.");
        return;
      }
    }
    setIsEditable(!isEditable);
  };

  // Browser Print for PDF Export
  const handlePrint = () => {
    window.print();
  };

  const fullName = `${editableData?.name || ""}`.trim();

  // Avatar fallback logic
  const userAvatar =
    editableData?.avatar ||
    editableData?.profile_photo_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || "User")}&background=0d6efd&color=fff`;

  return (
    <div className="d-flex flex-column gap-4">
      {/* Control Panel (Hidden in Print) */}
      <div className="card shadow-sm border-0 p-4 no-print">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h5 className="fw-bold mb-1">Dynamic CV Generator</h5>
            <p className="text-muted small mb-0">
              Customize, publish, and export your professional CV live.
            </p>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <div className="form-check form-switch bg-light px-3 py-2 rounded border m-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="publishToggle"
                checked={isPublished}
                onChange={handlePublishToggle}
              />
              <label
                className="form-check-label fw-semibold ms-1 small text-dark"
                htmlFor="publishToggle"
              >
                {isPublished ? (
                  <span className="text-success">Published</span>
                ) : (
                  <span className="text-secondary">Private</span>
                )}
              </label>
            </div>

            <button
              className={`btn btn-sm ${isEditable ? "btn-success" : "btn-outline-secondary"}`}
              onClick={handleToggleEdit}
            >
              <i
                className={`bi ${isEditable ? "bi-check-lg" : "bi-pencil"} me-1`}
              ></i>
              {isEditable ? "Done Editing" : "Quick Edit"}
            </button>

            <button
              className="btn btn-primary btn-sm d-flex align-items-center gap-2"
              onClick={handlePrint}
            >
              <i className="bi bi-printer"></i> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic CV Preview Card (Printable Section) */}
      <div className="card shadow-sm border-0 p-4 printable-cv-card">
        <div
          className="cv-preview-container bg-body text-body p-4 p-md-5 border rounded shadow-sm mx-auto w-100"
          style={{ maxWidth: "800px" }}
        >
          {/* Header: Profile Image, Name, Title & Contact */}
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 border-bottom pb-4 mb-4">
            <img
              src={userAvatar}
              alt="Profile"
              className="rounded-circle border shadow-sm"
              style={{ width: "110px", height: "110px", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || "User")}&background=0d6efd&color=fff`;
              }}
            />

            <div className="flex-grow-1 text-center text-md-start w-100">
              {isEditable ? (
                <div className="d-flex flex-column gap-2 mb-3">
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label small text-muted mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="name"
                        value={editableData?.name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted mb-1">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="title"
                        value={editableData?.title || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label small text-muted mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        name="email"
                        value={editableData?.email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted mb-1">
                        Primary Phone
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="phone"
                        value={editableData?.phone || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <label className="form-label small text-muted mb-1">
                        Secondary Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="secondary_mobile"
                        value={editableData?.secondary_mobile || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted mb-1">
                        Location / Address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="location"
                        value={editableData?.location || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="fw-bold mb-1">{editableData?.name || "N/A"}</h2>
                  <h5 className="text-primary mb-2">
                    {editableData?.title || "Software Developer"}
                  </h5>
                  <p className="text-body-secondary small mb-1">
                    <i className="bi bi-envelope me-1"></i>{" "}
                    {editableData?.email || "N/A"} |{" "}
                    <i className="bi bi-telephone me-1"></i>{" "}
                    {editableData?.phone || "N/A"}
                    {editableData?.secondary_mobile &&
                      ` / ${editableData.secondary_mobile}`}
                  </p>
                  <p className="text-body-secondary small mb-0">
                    <i className="bi bi-geo-alt me-1"></i>{" "}
                    {editableData?.location || "N/A"}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Professional Summary / Bio */}
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase text-body-secondary border-bottom pb-2 mb-2">
              Professional Summary
            </h6>
            {isEditable ? (
              <textarea
                className="form-control form-control-sm"
                rows={3}
                name="bio"
                value={editableData?.bio || ""}
                onChange={handleChange}
              />
            ) : (
              <div
                className="text-body-secondary small mb-0 lh-base"
                dangerouslySetInnerHTML={{
                  __html: editableData?.bio || "No summary provided.",
                }}
              />
            )}
          </div>

          {/* Dynamic Personal Information Section */}
          <div className="mb-4">
            <h6 className="fw-bold text-uppercase text-body-secondary border-bottom pb-2 mb-3">
              Personal Information
            </h6>

            {loadingAttrs ? (
              <div className="text-muted small py-2">Loading attributes...</div>
            ) : attributesList && attributesList.length > 0 ? (
              isEditable ? (
                <div className="row g-3">
                  {attributesList.map((attr: any) => {
                    const fieldKey = attr.name;
                    const fieldLabel = attr.name;
                    const typeSlug = attr.attribute_type?.slug || "text";
                    
                    const value =
                      editableData?.info?.[fieldKey] || 
                      editableData?.info?.[attr.id] || 
                      editableData?.attributes?.[fieldKey] || "";

                    const dropdownOptions = getDropdownOptions(attr.name);

                    return (
                      <div key={attr.id || fieldKey} className="col-md-6">
                        <label className="form-label small text-muted mb-1">
                          {fieldLabel}
                        </label>

                        {typeSlug === "date" ? (
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={value}
                            onChange={(e) =>
                              handleAttributeChange(fieldKey, e.target.value)
                            }
                          />
                        ) : typeSlug === "number" ? (
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={value}
                            onChange={(e) =>
                              handleAttributeChange(fieldKey, e.target.value)
                            }
                            placeholder={`Enter ${fieldLabel}`}
                          />
                        ) : typeSlug === "dropdown" || typeSlug === "select" ? (
                          <select
                            className="form-control form-control-sm"
                            value={value}
                            onChange={(e) =>
                              handleAttributeChange(fieldKey, e.target.value)
                            }
                          >
                            <option value="">Select {fieldLabel}</option>
                            {dropdownOptions.map((opt: string, idx: number) => (
                              <option key={idx} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={value}
                            onChange={(e) =>
                              handleAttributeChange(fieldKey, e.target.value)
                            }
                            placeholder={`Enter ${fieldLabel}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="row g-2 small text-body-secondary">
                  {attributesList.map((attr: any) => {
                    const fieldKey = attr.name;
                    const fieldLabel = attr.name;
                    const val =
                      editableData?.info?.[fieldKey] || 
                      editableData?.info?.[attr.id] || 
                      editableData?.attributes?.[fieldKey];

                    return (
                      <div key={attr.id || fieldKey} className="col-md-6">
                        <strong className="text-body">{fieldLabel}:</strong>{" "}
                        {val !== undefined && val !== null && val !== ""
                          ? String(val)
                          : "N/A"}
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <p className="text-body-secondary small mb-0">
                No custom attributes provided.
              </p>
            )}
          </div>

          {/* Projects Section */}
          <div className="mb-3">
            <h6 className="fw-bold text-uppercase text-body-secondary border-bottom pb-2 mb-3">
              Projects
            </h6>
            {projects && projects.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 border rounded bg-body-secondary"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="fw-bold mb-0 text-body">{proj.name}</h6>
                      <small className="text-body-secondary">
                        {proj.date_start
                          ? new Date(proj.date_start).toLocaleDateString()
                          : ""}
                        {proj.date_end
                          ? ` - ${new Date(proj.date_end).toLocaleDateString()}`
                          : ""}
                      </small>
                    </div>

                    <div
                      className="small text-body-secondary mb-2"
                      dangerouslySetInnerHTML={{
                        __html:
                          proj.markdown_description ||
                          "No description provided.",
                      }}
                    />

                    {proj.tags && proj.tags.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        {proj.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge bg-secondary text-white font-monospace small"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-body-secondary small">
                No projects added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Print Settings */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-cv-card, .printable-cv-card * {
            visibility: visible;
          }
          .printable-cv-card {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          .cv-preview-container {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};