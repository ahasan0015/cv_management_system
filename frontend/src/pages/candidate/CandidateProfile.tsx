import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

import { candidateService } from "../../services/candidateService";
import type { AuthUser, ProfileState, ProjectItem } from "../../types/candidate";

// Import modular components
import { MeTab } from "../../components/candidate/MeTab";
import { InfoTab } from "../../components/candidate/InfoTab";
import { ProjectsTab } from "../../components/candidate/ProjectsTab";
import { CvsTab } from "../../components/candidate/CvsTab";

const CandidateProfile = () => {
  const authContext = useAuth() as { user?: AuthUser };
  const user = authContext?.user;

  const [activeTab, setActiveTab] = useState<"me" | "info" | "projects" | "cvs">("me");

  const userAvatar =
    user?.avatar ||
    user?.profile_photo_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0d6efd&color=fff`;

  const [profile, setProfile] = useState<ProfileState>({
    name: user?.name ?? "Loading...",
    email: user?.email ?? "", // Auth context 
    phone: "+880 1700-000000",
    location: "Dhaka, Bangladesh",
    avatar: userAvatar,
    title: "Software Developer",
    bio: "I am a passionate software developer with experience in React, Node.js, and Laravel. Always looking for new challenges and opportunities to grow.",
  });

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false);

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    date_start: "",
    date_end: "",
    markdownDescription: "",
    tagsInput: "",
  });

  // Load Data on Mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const profileRes = await candidateService.getProfile();
        if (profileRes?.data) {
          const resData = profileRes.data;
          const fetchedAvatar = resData.avatar || resData.profile_photo_url;

          setProfile((prev) => ({
            ...prev,
            name: resData.name ?? prev.name,
            email: resData.email ?? user?.email ?? prev.email,
            avatar: fetchedAvatar ? fetchedAvatar : prev.avatar,
            title: resData.title ?? prev.title,
            phone: resData.phone ?? prev.phone,
            location: resData.location ?? prev.location,
            bio: resData.bio ?? prev.bio,
          }));
        }

        setLoadingProjects(true);
        const projectsRes = await candidateService.getProjects();
        if (projectsRes?.data?.data) {
          setProjects(projectsRes.data.data);
        }
      } catch (error) {
        console.error("Data load failed", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    loadData();
  }, [user]);

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await candidateService.updateProfile({
        name: profile.name,
        title: profile.title,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile.");
    }
  };

  // Handle Add Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) {
      toast.error("Project name is required!");
      return;
    }

    const tagsArray = newProject.tagsInput
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);

    try {
      const response = await candidateService.createProject({
        name: newProject.name,
        date_start: newProject.date_start || null,
        date_end: newProject.date_end || null,
        markdown_description: newProject.markdownDescription,
        tags: tagsArray,
      });

      if (response?.data?.data) {
        setProjects([response.data.data, ...projects]);
        setNewProject({ name: "", date_start: "", date_end: "", markdownDescription: "", tagsInput: "" });
        setShowAddProject(false);
        toast.success("Project added successfully!");
      }
    } catch (error) {
      console.error("Failed to add project", error);
      toast.error("Failed to save project.");
    }
  };

  // Handle Delete Project
  const handleDeleteProject = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await candidateService.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Failed to delete project", error);
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="container py-5">
      <Navbar />
      <div className="row g-4 mt-2">
        {/* Left Sidebar */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center">
            <img
              src={profile.avatar}
              className="rounded-circle mx-auto mb-3 border shadow-sm"
              alt="Profile"
              style={{ width: 140, height: 140, objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "User")}&background=0d6efd&color=fff`;
              }}
            />
            <h4 className="fw-bold">{profile.name}</h4>
            <p className="text-muted mb-2">{profile.email || "No email provided"}</p>
            <p className="text-muted small mb-3">{profile.title}</p>
            <button 
              className={`btn ${activeTab === "me" ? "btn-primary" : "btn-outline-primary"} w-100 mb-2`}
              onClick={() => setActiveTab("me")}
            >
              Edit Profile
            </button>
            <button 
              className={`btn ${activeTab === "cvs" ? "btn-primary" : "btn-outline-primary"} w-100`}
              onClick={() => setActiveTab("cvs")}
            >
              Download CV
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-md-8">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "me" ? "active fw-bold" : "text-dark"}`}
                onClick={() => setActiveTab("me")}
              >
                <i className="bi bi-person me-1"></i> Me
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "info" ? "active fw-bold" : "text-dark"}`}
                onClick={() => setActiveTab("info")}
              >
                <i className="bi bi-info-circle me-1"></i> Info
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "projects" ? "active fw-bold" : "text-dark"}`}
                onClick={() => setActiveTab("projects")}
              >
                <i className="bi bi-code-square me-1"></i> Projects
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "cvs" ? "active fw-bold" : "text-dark"}`}
                onClick={() => setActiveTab("cvs")}
              >
                <i className="bi bi-file-earmark-text me-1"></i> CVs
              </button>
            </li>
          </ul>

          {/* TAB 1: ME */}
          {activeTab === "me" && (
            <MeTab profile={profile} setProfile={setProfile} onSubmit={handleUpdateProfile} />
          )}

          {/* TAB 2: INFO */}
          {activeTab === "info" && (
            <InfoTab profile={profile} setProfile={setProfile} onSubmit={handleUpdateProfile} />
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === "projects" && (
            <ProjectsTab
              projects={projects}
              loadingProjects={loadingProjects}
              showAddProject={showAddProject}
              setShowAddProject={setShowAddProject}
              newProject={newProject}
              setNewProject={setNewProject}
              handleAddProject={handleAddProject}
              handleDeleteProject={handleDeleteProject}
            />
          )}

          {/* TAB 4: CVS */}
          {activeTab === "cvs" && (
            <CvsTab onUpload={() => toast.success("Resume uploaded successfully!")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;