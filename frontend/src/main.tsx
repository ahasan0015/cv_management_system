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
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import CandidateProfile from "./pages/candidate/CandidateProfile";

// Pages

const AppRoute = createBrowserRouter([
  // Public Pages
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  {
    element: <ProtectedRoute allowedRoles={["admin", "recruiter"]} />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
  // only for candidate route
  {
    element: <ProtectedRoute allowedRoles={["candidate"]} />,
    children: [
      { path: "/candidate-profile", element: <CandidateProfile /> }, 
                   
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={AppRoute} />
  </AuthProvider>,
);
