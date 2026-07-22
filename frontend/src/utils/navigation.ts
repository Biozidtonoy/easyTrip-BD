import type { UserRole } from "../types/auth";

export interface NavItem {
  label: string;
  path: string;
}

const publicLinks: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "Hotels", path: "/hotels" },
];

export const getNavigationLinks = (
  isAuthenticated: boolean,
  role?: UserRole
): NavItem[] => {

    // console.log("Navigation:", {
    //   isAuthenticated,
    //   role,
    // });

  if (!isAuthenticated) {
    return [
      ...publicLinks,
      {
        label: "My Bookings",
        path: "/my-bookings",
      },
    ];
  }

  switch (role) {
    case "traveler":
      return [
        ...publicLinks,
        {
          label: "My Bookings",
          path: "/my-bookings",
        },
      ];

    case "hotel_owner":
      return [
        ...publicLinks,
        {
          label: "Dashboard",
          path: "/owner/dashboard",
        },
        {
          label: "My Hotels",
          path: "/owner/hotels",
        },
      ];

    case "admin":
      return [
        ...publicLinks,
        {
          label: "Dashboard",
          path: "/admin/dashboard",
        },
        {
          label: "Manage Users",
          path: "/admin/users",
        },
      ];

    default:
      return publicLinks;
  }
};