import type { Role } from "../context/Type";

export const getDashboardRoute = (role: Role) => {
  switch (role) {
    case "admin":
      return "/admin-dashboard";

    case "recruiter":
      return "/recruiter-dashboard";

    case "candidate":
      return "/candidate-profile";

    default:
      return "/";
  }
};