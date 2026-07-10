import { createRoot } from "react-dom/client";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Context

import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";

import Landing from "./pages/Landing";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import AuthSuccess from "./pages/AuthSuccess";
import RecruterDashboard from "./pages/recruiter/RecruterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Pages

const AppRoute = createBrowserRouter([
  // Public Pages
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  // Google Auth Success Route
  { path: "/auth-success", element: <AuthSuccess /> },
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [{ path: "/admin-dashboard", element: <AdminDashboard /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["recruiter"]} />,
    children: [{ path: "/recruiter-dashboard", element: <RecruterDashboard /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["admin", "recruiter"]} />,
    // children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["candidate"]} />,
    children: [{ path: "/candidate-profile", element: <CandidateProfile /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={AppRoute} />
  </AuthProvider>,
);
