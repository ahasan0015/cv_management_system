import { createRoot } from "react-dom/client";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

//skeleton css
import "react-loading-skeleton/dist/skeleton.css";

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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AttributePage from "./pages/admin/AttributePage";
import { Toaster } from "react-hot-toast";
import PositionsPage from "./pages/recruiter/PositionsPage";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Pages

const AppRoute = createBrowserRouter([
  // Public Pages
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // Google Auth Success Route
  { path: "/auth-success", element: <AuthSuccess /> },
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [{ path: "/admin-dashboard", element: <AdminDashboard /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["recruiter"]} />,
    children: [
      { path: "/recruiter-dashboard", element: <RecruterDashboard /> },
      { path: "/recruiter-position", element: <PositionsPage /> },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["admin", "recruiter"]} />,
    children: [{ path: "/attributes", element: <AttributePage /> }],
  },
  {
    element: <ProtectedRoute allowedRoles={["candidate"]} />,
    children: [{ path: "/candidate-profile", element: <CandidateProfile /> }],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={AppRoute} />
    </AuthProvider>
  </QueryClientProvider>,
);
