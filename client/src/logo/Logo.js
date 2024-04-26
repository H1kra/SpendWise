import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import spendwise from "../img/spendwise.png";

function LogoImg() {
    const navigate = useNavigate();
    return (
        <Container>
            <img style={swlogo()} src={spendwise} alt={"SpendWiseLogo"} onClick={() => navigate("/")}/>
        </Container>
    )
}
function swlogo() {
    return {position: "absolute",display: "flex", width: "30%" };
}

export default LogoImg;