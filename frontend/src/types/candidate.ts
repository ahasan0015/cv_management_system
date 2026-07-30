// --- Info Tab Specific Union Types ---
export type GenderType = "Male" | "Female" | "Other" | "";
export type MaritalStatusType = "Single" | "Married" | "Divorced" | "";
export type BloodGroupType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "";

export interface ProjectItem {
  id: number;
  name: string;
  date_start?: string;
  date_end?: string;
  markdown_description: string;
  tags: string[];
}

export interface ProfileState {
  id?: number;
  user_id?: number;
  name: string;
  email: string;
  is_published?: boolean;
  cv_path?: string | null;
  projects?: ProjectItem[];
  
  // Info Tab Fields (Updated with strict types where applicable)
  father_name?: string;
  mother_name?: string;
  dob?: string;
  gender?: GenderType;
  religion?: string;
  marital_status?: MaritalStatusType;
  nationality?: string;
  nid?: string;
  title?: string;
  phone?: string;
  secondary_mobile?: string;
  alternate_email?: string;
  emergency_contact?: string;
  blood_group?: BloodGroupType;
  location?: string;
  bio?: string;
  
  [key: string]: any;
}

export type ProfileResponse = ProfileState;

export interface AuthUser {
  id?: number;
  name?: string;
  email?: string; 
  role?: string;
  avatar?: string;
  profile_photo_url?: string;
}

export interface ProfileApiResponse {
  data: ProfileState;
}

export interface NewProjectState {
  name: string;
  date_start: string;
  date_end: string;
  markdownDescription: string;
  tagsInput: string;
}

export interface ProjectsTabProps {
  projects: ProjectItem[];
  loadingProjects: boolean;
  showAddProject: boolean;
  setShowAddProject: (show: boolean) => void;
  newProject: NewProjectState;
  setNewProject: React.Dispatch<React.SetStateAction<NewProjectState>>;
  handleAddProject: (e: React.FormEvent) => void;
  handleDeleteProject: (id: number) => void;
}

// --- InfoTab Props Interface ---
export interface InfoTabProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

// DynamicCvTab Props
export interface DynamicCvTabProps {
  profile: ProfileState;
  projects: ProjectItem[];
  hasPermission: boolean;
}