import { useContext } from "react";
import "./navbar.css";
import UserContext from "../../contexts/UserContext";
import { LogoutOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isConnected, logout } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link to="/">
          <div className="navbar__navigation-items">
            <p className="navbar__item">HOME</p>
          </div>
        </Link>
        <div className="navbar__user-items">
          {isConnected ? (
            <>
              <UserOutlined style={{ fontSize: "2rem", color: "#fff" }} />
              <LogoutOutlined
                onClick={logout}
                style={{ fontSize: "2rem", color: "#fff" }}
              />
            </>
          ) : (
            <LoginOutlined style={{ fontSize: "2rem", color: "#fff" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
