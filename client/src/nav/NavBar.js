import React, { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../user/UserContext";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link} from "react-router-dom";
import { SideBarData } from "./NavBarData";
import "./NavBar.css";

import Icon from '@mdi/react';
import {mdiLogout} from "@mdi/js";
import { mdiAccount } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { mdiWindowClose } from '@mdi/js';

function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const [ sidebar, setSidebar ] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars" >
                    <Icon path={mdiMenu} size={1} onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    <div className="navbar-toggle" >
                        <Link to="#" className="menu-bars" >
                            <Icon path={mdiWindowClose} size={1} onClick={showSidebar}/>
                        </Link>
                    </div>
                    <div className="user-login">
                                    <NavDropdown
                                        title={loggedInUser ? loggedInUser.name : <Icon path={mdiAccount} size={1} />}
                                        drop={"start"}
                                    >
                                        {getUserMenuList({ userList, loggedInUser, handlerMap })}
                                    </NavDropdown>
                    </div>
                        {SideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cname} onClick={showSidebar}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </nav>
        </>
    );
}


function getUserMenuList({ userList, loggedInUser, handlerMap }) {
    // temporary solution to enable login/logout
    const userMenuItemList = userList.map((user) => (
        <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
            <li>{user.name}</li>
        </NavDropdown.Item>
    ));

    if (loggedInUser) {
        userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
        userMenuItemList.push(
            <NavDropdown.Item
                key={"logout"}
                onClick={() => handlerMap.logout()}
                style={{ color: "red" }}
            >
                <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlas se"}
            </NavDropdown.Item>
        );
    }

    return userMenuItemList;
}

export default NavBar;