import Footer from "../../ShareComponent/Footer";
import Navbar from "../../ShareComponent/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
