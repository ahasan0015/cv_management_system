import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasHandledAuth = useRef(false);

  useEffect(() => {
    if (hasHandledAuth.current) return;
    hasHandledAuth.current = true;

    const token = searchParams.get("token");
    const role = searchParams.get("role")?.toLowerCase();

    //   console.log("Google Data:", {
    //   name: searchParams.get("name"),
    //   avatar: searchParams.get("avatar"),
    //   email: searchParams.get("email")
    // });

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    login({
      token,
      role: role ?? "candidate",
      id: 0,
      name: searchParams.get("name") ?? "Google User",
      avatar: searchParams.get("avatar") ?? undefined,
      email: searchParams.get("email") ?? undefined,
    });

    if (role === "candidate") {
      navigate("/candidate-profile", { replace: true });
    } else if (role === "recruiter") {
      navigate("/recruiter-dashboard", { replace: true });
    } else {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [navigate, searchParams, login]);

  return <div>Authenticating, please wait...</div>;
};

export default AuthSuccess;
