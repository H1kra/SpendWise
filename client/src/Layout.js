import { Outlet } from "react-router-dom";

import NavBar from "./nav/NavBar";
import LogoImg from "./logo/Logo";


const Layout = () => {
    return (
        <>
            <LogoImg/>
            <NavBar/>
            <div style={bodyStyle()}>
                <Outlet />
            </div>
            <div className={"card-footer text-light"} style={footerStyle()}>
                © Milan Soucek
            </div>
        </>
    );
};

function bodyStyle() {
    return {
        overflow: "auto",
        padding: "16px",
        flex: "1",
        borderTop: "white 4px solid",
        borderBottom: "white 4px solid",
    };
}

function footerStyle() {
    return { padding: "8px", textAlign: "center", backgroundColor: "lightgrey" };
}

export default Layout;