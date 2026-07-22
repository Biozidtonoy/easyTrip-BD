import { Outlet } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;