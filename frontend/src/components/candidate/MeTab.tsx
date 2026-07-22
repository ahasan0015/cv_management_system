import React from "react";


import type { ProfileState } from "../../types/candidate";
import { TiptapEditor } from "../common/TiptapEditor";

interface MeTabProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const MeTab: React.FC<MeTabProps> = ({ profile, setProfile, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="card shadow-sm border-0 p-4 mb-4">
      <h5 className="fw-bold border-bottom pb-2 mb-3">About Me</h5>
      <div className="mb-3">
        <label className="form-label small text-muted mb-2">
          Professional Bio / Summary
        </label>
        {/* Tiptap Editor*/}
        <TiptapEditor
          content={profile.bio}
          onChange={(html) => setProfile({ ...profile, bio: html })}
        />
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-success btn-sm px-4">
          Save Changes
        </button>
      </div>
    </form>
  );
};