import React, { useState } from "react";
import type { ProfileState } from "../../types/candidate";

interface InfoTabProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const InfoTab: React.FC<InfoTabProps> = ({
  profile,
  setProfile,
  onSubmit,
}) => {
  // when page load page look readonly first
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
    setIsEditing(false); // when save lock again
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="card shadow-sm border-0 p-4 mb-4"
    >
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

      <div className="row g-3">
        {/* Name Details */}
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            First Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.first_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, first_name: e.target.value })
            }
            disabled={!isEditing} // input disable
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Last Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.last_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, last_name: e.target.value })
            }
            disabled={!isEditing}
            required
          />
        </div>

        {/* Family Details */}
        <div className="col-md-6">
          <label className="form-label small fw-semibold">Father’s Name</label>
          <input
            type="text"
            className="form-control"
            value={profile.father_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, father_name: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-semibold">Mother’s Name</label>
          <input
            type="text"
            className="form-control"
            value={profile.mother_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, mother_name: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        {/* Basic Details */}
        <div className="col-md-4">
          <label className="form-label small fw-semibold">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold">
            Gender <span className="text-danger">*</span>
          </label>
          <select
            className="form-control"
            value={profile.gender || "Male"}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            disabled={!isEditing}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold">Religion</label>
          <input
            type="text"
            className="form-control"
            value={profile.religion || ""}
            onChange={(e) =>
              setProfile({ ...profile, religion: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label small fw-semibold">Marital Status</label>
          <select
            className="form-control"
            value={profile.marital_status || "Single"}
            onChange={(e) =>
              setProfile({ ...profile, marital_status: e.target.value })
            }
            disabled={!isEditing}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold">Nationality</label>
          <input
            type="text"
            className="form-control"
            value={profile.nationality || "Bangladeshi"}
            onChange={(e) =>
              setProfile({ ...profile, nationality: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label small fw-semibold">Blood Group</label>
          <select
            className="form-control"
            value={profile.blood_group || ""}
            onChange={(e) =>
              setProfile({ ...profile, blood_group: e.target.value })
            }
            disabled={!isEditing}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Identification */}
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            National ID Number
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.nid || ""}
            onChange={(e) => setProfile({ ...profile, nid: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Professional Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.title || ""}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            disabled={!isEditing}
            required
          />
        </div>

        {/* Contact Details */}
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Primary Mobile <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.phone || ""}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Secondary Mobile
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.secondary_mobile || ""}
            onChange={(e) =>
              setProfile({ ...profile, secondary_mobile: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Primary Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Alternate Email
          </label>
          <input
            type="email"
            className="form-control"
            value={profile.alternate_email || ""}
            onChange={(e) =>
              setProfile({ ...profile, alternate_email: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Emergency Contact
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.emergency_contact || ""}
            onChange={(e) =>
              setProfile({ ...profile, emergency_contact: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label small fw-semibold">
            Location / Address <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={profile.location || ""}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            disabled={!isEditing}
            required
          />
        </div>

        {/* Save Button (এডিট মোড চালু থাকলেই কেবল দেখাবে) */}
        {isEditing && (
          <div className="col-12 text-end mt-4">
            <button type="submit" className="btn btn-success btn-sm px-4">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
