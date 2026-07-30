import React, { useState } from "react";

import type {
  InfoTabProps,
  GenderType,
  MaritalStatusType,
  BloodGroupType,
} from "../../types/candidate";
import api from "../../config/axios";

export const InfoTab: React.FC<InfoTabProps> = ({
  profile,
  setProfile,
  isEditing,
  setIsEditing,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // dynamic attribute handeler
  const handleAttributeChange = (key: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      info: {
        ...(prev.info || {}),
        [key]: value,
      },
    }));
  };

  // "Profile Summary"
  const attributesList = (profile.available_attributes || []).filter(
    (attr: any) =>
      attr.name.toLowerCase() !== "profile summary" &&
      attr.attribute_type?.slug !== "markdown" &&
      !attr.name.toLowerCase().includes("image") &&
      !attr.name.toLowerCase().includes("avatar"),
  );

  // type wise option list
  const genderOptions: GenderType[] = ["Male", "Female", "Other"];
  const maritalStatusOptions: MaritalStatusType[] = [
    "Single",
    "Married",
    "Divorced",
  ];
  const bloodGroupOptions: BloodGroupType[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  // attribute name with correct option return
  const getDropdownOptions = (attributeName: string): string[] => {
    const name = attributeName.toLowerCase();
    if (name.includes("gender")) return genderOptions;
    if (name.includes("marital")) return maritalStatusOptions;
    if (name.includes("blood")) return bloodGroupOptions;
    return ["Option 1"];
  };

  // drag and drop file handler
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isEditing) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isEditing) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadAvatarToCloud(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadAvatarToCloud(files[0]);
    }
  };

  // cloudinary image upload function to upload profile image
  const uploadAvatarToCloud = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // instant local preview
    const localPreview = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: localPreview }));

    const formData = new FormData();
    formData.append("avatar", file);

    setIsUploading(true);
    try {
      const response = await api.post("/candidate/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Response:", response.data); // console cheack

      const cloudUrl =
        response.data?.data?.avatar ||
        response.data?.data?.photo ||
        response.data?.avatar ||
        response.data?.photo;

      if (cloudUrl) {
        // cloud url convert to permanent 
        setProfile((prev) => ({
          ...prev,
          avatar: cloudUrl,
        }));
      } else {
        alert("Image uploaded, but avatar URL was not returned from server.");
      }
    } catch (error: any) {
      console.error("Cloud upload failed:", error.response?.data || error);
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to upload image. Please try again.";
      alert(serverMessage);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h5 className="fw-bold m-0">Personal Information</h5>
        {!isEditing ? (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm px-3"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil-square me-1"></i> Edit Info
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

      {/* --- User Profile Image Drag & Drop Section --- */}
      <div className="mb-4 text-center">
        <label className="form-label small fw-semibold d-block text-start mb-2">
          Profile Image
        </label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border border-2 border-dashed rounded-3 p-3 position-relative ${
            isDragging ? "bg-light border-primary" : "bg-white"
          }`}
          style={{
            borderColor: isEditing ? "#0d6efd" : "#dee2e6",
            transition: "all 0.2s ease",
          }}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            {isUploading ? (
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ height: "80px" }}
              >
                <div
                  className="spinner-border spinner-border-sm text-primary mb-2"
                  role="status"
                ></div>
                <span className="small text-muted">Uploading to cloud...</span>
              </div>
            ) : profile.avatar || profile.profile_photo_url ? (
              <img
                src={profile.avatar || profile.profile_photo_url}
                alt="Profile Preview"
                className="rounded-circle mb-2 object-fit-cover shadow-sm"
                style={{ width: "80px", height: "80px" }}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mb-2 fw-bold fs-4"
                style={{ width: "80px", height: "80px" }}
              >
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}

            {isEditing && !isUploading ? (
              <>
                <p className="small text-muted mb-1">
                  Drag & drop your image here, or{" "}
                  <label
                    htmlFor="avatarUpload"
                    className="text-primary text-decoration-underline"
                    style={{ cursor: "pointer" }}
                  >
                    browse
                  </label>
                </p>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleFileChange}
                />
                <span className="text-muted" style={{ fontSize: "11px" }}>
                  Supports: JPG, PNG, WEBP
                </span>
              </>
            ) : (
              !isUploading && (
                <p className="small text-muted mb-0">
                  Enable edit mode to change profile image.
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {/* --- Dynamic Personal Info Fields --- */}
      <div className="row g-3">
        {attributesList.length > 0 ? (
          attributesList.map((attr: any) => {
            const fieldKey = attr.name;
            const value =
              profile.info?.[fieldKey] || profile.info?.[attr.id] || "";
            const typeSlug = attr.attribute_type?.slug || "string";

            const dropdownOptions = getDropdownOptions(attr.name);

            return (
              <div key={attr.id} className="col-md-6">
                <label className="form-label small fw-semibold">
                  {attr.name}
                </label>

                {typeSlug === "date" ? (
                  <input
                    type="date"
                    className="form-control"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(fieldKey, e.target.value)
                    }
                    disabled={!isEditing}
                  />
                ) : typeSlug === "number" ? (
                  <input
                    type="number"
                    className="form-control"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(fieldKey, e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder={`Enter ${attr.name}`}
                  />
                ) : typeSlug === "dropdown" ? (
                  <select
                    className="form-control"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(fieldKey, e.target.value)
                    }
                    disabled={!isEditing}
                  >
                    <option value="">Select {attr.name}</option>
                    {dropdownOptions.map((opt: string, index: number) => (
                      <option key={index} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(fieldKey, e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder={`Enter ${attr.name}`}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="text-muted text-center py-3">
            No attributes found.
          </div>
        )}
      </div>
    </div>
  );
};
