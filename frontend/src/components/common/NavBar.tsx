import React, { useContext } from "react";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

import logo from "../../ccbc.png";
import { UserRole } from "../../constants/Enums";
import AuthContext from "../../contexts/AuthContext";

const NavBar = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const isAdmin = authenticatedUser?.role === UserRole.Admin;

  return (
    <div variant="default"> 
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <Link to="/">
          <img
            src={logo}
            alt="CCBC Logo"
            style={{
              height: "60px",
              borderRadius: "50px",
              marginRight: "30px",
            }}
          />
        </Link>
        <h4 style={{ color: "#fff", margin: "30px" }}>Home</h4>
        <Link to="/dashboard"></Link>
        {isAdmin && (
          <h4 style={{ color: "#fff", margin: "30px" }}>Admin Dashboard</h4>
        )}
        </Link>
      </div>
      <div>
        <HiUser style={{ color: "#fff", height: "40px", width: "40px" }} />
      </div>
    </div>
  );
};

export default NavBar;
