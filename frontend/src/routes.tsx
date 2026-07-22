import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DestinationPage from "./pages/DestinationPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import MyBookingsPage from "./pages/MyBookingsPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import DestinationDetailsPage from "./pages/DestinationDetailsPage";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import HotelsPage from "./pages/HotelsPage";
import BookingPage from "./pages/BookingPage";



const routes = [
  // ---------- Routes with Navbar & Footer ----------
  {
    element: <MainLayout />,

    children: [
      // ---------- Public Routes ----------
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/destinations",
        element: <DestinationPage />,
      },

      {
        path: "/hotels",
        element: <HotelsPage />,
      },

      {
        path: "/destinations/:id",
        element: <DestinationDetailsPage />,
      },
      {
        path: "/hotels/:id",
        element: <HotelDetailsPage />,
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
          {
            path: "/bookings/new/:roomId",
            element: <BookingPage />,
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
    ],
  },

  // ---------- Authentication Routes ----------
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

export default routes;