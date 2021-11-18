import React, { useContext } from "react";
import logo from "../../ccbc.png";
import {Link, useLocation} from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { Route, Redirect } from "react-router-dom";
import { UserRole } from "../../constants/Enums";

import AuthContext from "../../contexts/AuthContext";

const NavBar = (): React.ReactElement => {
    const { authenticatedUser } = useContext(AuthContext);
    const isAdmin = authenticatedUser?.role == UserRole.Admin;

    return (
                <div style={{
                    display: "flex", 
                    flexDirection: "row", 
                    height: "calc(96px - 32px)",
                    width: "calc(100vw - 160px)",
                    backgroundColor: "#2D5577", 
                    alignItems: "center",
                    padding: "16px 80px",
                    position: "absolute",
                    justifyContent: "space-between",
                    top: 0}}>
                        
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Link to="/app/home"><img src={logo} style={{height: "60px", borderRadius: "50px", marginRight: "30px"}}></img></Link>
                        <h4 style={{color: "#fff", margin: "30px"}}>Home</h4>
                        {isAdmin && 
                            <h4 style={{color: "#fff", margin: "30px"}}>Admin Dashboard</h4>
                        }
                        
                    </div>
                    <div>
                        
                        <HiUser style={{color: "#fff", height: "40px", width: "40px"}}></HiUser>
                    </div>
                </div>
            )
        }
        
export default NavBar;

