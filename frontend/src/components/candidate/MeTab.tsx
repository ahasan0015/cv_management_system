import React, { useState } from "react";
import type { ProfileState } from "../../types/candidate";
import { TiptapEditor } from "../common/TiptapEditor";

interface MeTabProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const MeTab: React.FC<MeTabProps> = ({
  profile,
  setProfile,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
    setIsEditing(false);
  };

  // available_attributes 
  const summaryAttr = profile.available_attributes?.find(
    (attr: { name?: string; attribute_type?: { slug?: string } }) =>
      attr.name === "Profile Summary" ||
      attr.attribute_type?.slug === "markdown"
  );

  // if not find dynamic name use default
  const attributeName = summaryAttr?.name || "Professional Bio / Summary";

  const summaryContent = profile.info?.["Profile Summary"] || profile.bio || "";

  const handleSummaryChange = (html: string) => {
    setProfile((prev) => ({
      ...prev,
      info: {
        ...(prev.info || {}),
        "Profile Summary": html,
      },
      bio: html,
    }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="card shadow-sm border-0 p-4 mb-4"
    >
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="fw-bold m-0">{attributeName}</h5>
        {!isEditing ? (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm px-3"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil-square me-1"></i> Edit Bio
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm px-3"
            onClick={() => setIsEditing(false)}
          >
            <i className="bi bi-x-circle me-1"></i> Cancel
          </button>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label small text-muted mb-2">
          {attributeName}
        </label>

        {/* edit mood enable for editing */}
        <div
          style={{
            pointerEvents: isEditing ? "auto" : "none",
            opacity: isEditing ? 1 : 0.85,
          }}
        >
          <TiptapEditor
            content={summaryContent}
            onChange={handleSummaryChange}
          />
        </div>
      </div>

      {isEditing && (
        <div className="text-end">
          <button type="submit" className="btn btn-success btn-sm px-4">
            Save Changes
          </button>
        </div>
      )}
    </form>
  );
};