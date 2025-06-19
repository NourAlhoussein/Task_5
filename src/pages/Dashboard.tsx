import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const openSmallNav = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="montserrat gray-back">
      <Navbar isNavbarOpen={isNavbarOpen} />
      <div className="small-nav">
        <Image className="nav-logo" src="/Task_5/images/logo.png" />
        <IoMenu className="fs-4" onClick={openSmallNav} />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
