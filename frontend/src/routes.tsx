import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DestinationPage from "./pages/DestinationPage";

import ProfilePage from "./pages/ProfilePage";
import MyBookingsPage from "./pages/MyBookingsPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

const routes = [
  // ---------- Public Routes ----------
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/destinations",
    element: <DestinationPage />,
  },

  // ---------- Traveler Routes ----------
  {
    element: <RoleProtectedRoute allowedRoles={["traveler"]} />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/my-bookings",
        element: <MyBookingsPage />,
      },
    ],
  },

  // ---------- Hotel Owner Routes ----------
  {
    element: <RoleProtectedRoute allowedRoles={["hotel_owner"]} />,
    children: [
      {
        path: "/owner/dashboard",
        element: <OwnerDashboardPage />,
      },
    ],
  },

  // ---------- Admin Routes ----------
  {
    element: <RoleProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboardPage />,
      },
    ],
  },
];

export default routes;
