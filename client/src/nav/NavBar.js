import React, { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../user/UserContext";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link , useLocation} from "react-router-dom";
import { SideBarData } from "./NavBarData";
import "./NavBar.css";

import Icon from '@mdi/react';
import {mdiLogout} from "@mdi/js";
import { mdiAccount } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { mdiWindowClose } from '@mdi/js';
import TransactionForm from "../transaction/TransactionForm";


function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const [ sidebar, setSidebar ] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showStandingOrderForm, setShowStandingOrderForm] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    function onClicked(){
        showSidebar();
        setShowTransactionForm({});
    }
    function addStandingOrder(){
        showSidebar();
        setShowStandingOrderForm({});
    }
    return (
        <>
            {!!showTransactionForm ? (
                <TransactionForm transaction={showTransactionForm} setShowTransactionForm={setShowTransactionForm} />
            ) : null}
            {!!showStandingOrderForm ? (
                <TransactionForm standingOrder={showStandingOrderForm} setShowStandingOrderForm={setShowStandingOrderForm} />
            ) : null}
            <div className="mynavbar">
                <Link to="#" className="mymenu-bars" >
                    <Icon path={mdiMenu} size={1} onClick={showSidebar} style={{color: "black"}}/>
                </Link>
            </div>
            <nav className={sidebar ? "mynav-menu active" : "mynav-menu"}>
                <ul className="mynav-menu-items">
                    <div className="mynavbar-toggle" >
                        <Link to="#" className="mymenu-bars" >
                            <Icon path={mdiWindowClose} size={1} onClick={showSidebar} style={{color: "black"}}/>
                        </Link>
                    </div>
                    <div className="myuser-login">
                                    <NavDropdown
                                        title={loggedInUser ? "Welcome " + loggedInUser.name : <Icon path={mdiAccount} size={1} />}
                                        show={dropdownOpen}
                                        onClick={toggleDropdown}
                                        drop={"start"}
                                    >
                                        {getUserMenuList({ userList, loggedInUser, handlerMap })}
                                    </NavDropdown>
                    </div>
                        {loggedInUser ? (
                            SideBarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cname} onClick={item.title === "Add Transaction" ? onClicked : (item.title === "Add Standing Order" ? addStandingOrder : showSidebar)}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li style={{listStyle: "none"}}>please log-in</li>
                        )}
                </ul>
            </nav>
        </>
    );
}


function getUserMenuList({userList, loggedInUser, handlerMap}) {
    // temporary solution to enable login/logout
    const userMenuItemList = userList.map((user) => (
        <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
            <li>{user.name} {user.surename}</li>
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