// src/types/candidate.ts

export interface ProjectItem {
  id: number;
  name: string;
  date_start?: string;
  date_end?: string;
  markdown_description: string;
  tags: string[];
}

export interface ProfileState {
  name: string;
  first_name?: string;
  last_name?: string;
  father_name?: string;
  mother_name?: string;
  dob?: string;
  gender?: string;
  religion?: string;
  marital_status?: string;
  nationality?: string;
  nid?: string;
  passport_number?: string;
  passport_issue_date?: string;
  email: string;
  alternate_email?: string;
  phone: string;
  secondary_mobile?: string;
  emergency_contact?: string;
  blood_group?: string;
  height?: string;
  weight?: string;
  location: string;
  avatar: string;
  title: string;
  bio: string;
}

export interface AuthUser {
  id?: number;
  name?: string;
  email?: string; 
  role?: string;
  avatar?: string;
  profile_photo_url?: string;
}

export interface ProfileApiResponse {
  name?: string;
  email?: string;
  avatar?: string;
  profile_photo_url?: string;
  title?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

//  ProjectsTab
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