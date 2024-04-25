import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../user/UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiScaleBalance, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" style={componentStyle()}>
            <Container>
                <Navbar.Brand>
                    <Button style={logoStyle()} onClick={() => navigate("/")}>
                        <Icon path={mdiScaleBalance} size={3} color={"black"}/>
                        SpendWise
                    </Button>
                </Navbar.Brand>
                <Nav>
                    <NavDropdown
                        title={loggedInUser ? loggedInUser.name : "Přihlaš se"}
                        drop={"start"}
                    >
                        {getUserMenuList({ userList, loggedInUser, handlerMap })}
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

function componentStyle() {
    return { backgroundColor: "#FFFFFF" };
}

function logoStyle() {
    return {
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "black",
        border: "0px"
    };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
    // temporary solution to enable login/logout
    const userMenuItemList = userList.map((user) => (
        <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
            {user.name}
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