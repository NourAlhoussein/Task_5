import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { Image } from "react-bootstrap";
import { useState } from "react";
function Dashboard() {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const openSmallNav = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <div className="montserrat gray-back">
      <Navbar isNavbarOpen={isNavbarOpen} />
      <div className="small-nav">
        <Image className="nav-logo" src="/images/logo.png" />
        <IoMenu className="fs-4" onClick={openSmallNav} />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
