import axios from "axios";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  isNavbarOpen: boolean;
}
function Navbar({ isNavbarOpen }: NavbarProps) {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
        console.log("logout success");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className={`left-navbar ${
        isNavbarOpen ? "open-smallNav" : "close-smallNav"
      }`}
    >
      <Image className="nav-logo" src="/Task_5/images/logo.png" />
      <Image className="rounded-circle mt-5" src="/Task_5/images/photo.png" />
      <div className="mt-3 fw-700 fs-17px">Mohammed Alkordy</div>
      <div className="mt-4 part2-nav">
        <div>
          <div className="d-flex flex-row align-items-center justify-content-center cursor-pointer gap-15px nav-item-active">
            <Image className="nav-icon" src="/Task_5/images/Vector.png" />
            <div className="fw-500 fs-14px">Products</div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center cursor-pointer gap-15px mt-4">
            <Image className="nav-icon2" src="/Task_5/images/Vector (1).png" />
            <div className="fw-500 fs-14px">Favorites</div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center cursor-pointer gap-15px mt-4">
            <Image className="nav-icon2" src="/Task_5/images/Vector (1).png" />
            <div className="fw-500 fs-14px">order list</div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center cursor-pointer gap-15px">
          <div className="fw-500 fs-14px" onClick={logout}>
            Logout
          </div>
          <Image className="nav-icon3" src="/Task_5/images/Vector (2).png" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
