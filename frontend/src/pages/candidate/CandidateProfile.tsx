import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";

const CandidateProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name ?? "Loading...",
    email: user?.email ?? "",
    avatar: user?.avatar ?? "https://ui-avatars.com/api/?name=User&background=0d6efd&color=fff",
    title: "Software Developer",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile");
        if (response?.data) {
          setProfile((prev) => ({
            ...prev,
            name: response.data.name ?? prev.name,
            email: response.data.email ?? prev.email,
            avatar: response.data.avatar ?? prev.avatar,
            title: response.data.title ?? prev.title,
          }));
        }
      } catch (error) {
        console.error("Profile load failed", error);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="container py-5">
      <Navbar />
      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 text-center">
            <img
              src={profile.avatar}
              className="rounded-circle mx-auto mb-3"
              alt="Profile"
              style={{ width: 140, height: 140, objectFit: "cover" }}
            />
            <h4 className="fw-bold">{profile.name}</h4>
            <p className="text-muted mb-2">{profile.email || "No email provided"}</p>
            <p className="text-muted">{profile.title}</p>
            <button className="btn btn-primary w-100 mb-2">Edit Profile</button>
            <button className="btn btn-outline-primary w-100">Download CV</button>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">About Me</h5>
            <p className="text-muted">
              I am a passionate software developer with experience in React,
              Node.js, and Laravel. Always looking for new challenges and
              opportunities to grow.
            </p>
          </div>

          <div className="card shadow-sm border-0 p-4 mb-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-secondary p-2">React.js</span>
              <span className="badge bg-secondary p-2">Laravel</span>
              <span className="badge bg-secondary p-2">TypeScript</span>
              <span className="badge bg-secondary p-2">Bootstrap</span>
            </div>
          </div>

          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3">Experience</h5>
            <div className="mb-3">
              <h6 className="fw-bold">Frontend Developer</h6>
              <p className="text-muted mb-1">Tech Firm Ltd. | 2024 - Present</p>
              <p className="small">
                Working on enterprise-level web applications using React and
                Bootstrap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
