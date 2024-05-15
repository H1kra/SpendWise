import {useContext, useEffect, useState} from "react";
import { StandingOrderListContext } from "./StandingOrderListContext.js";


import Button from "react-bootstrap/esm/Button.js";

import StandingOrderForm from "./StandingOrderForm";
import StandingOrderCard from "./StandingOrderCard.js";
import Container from "react-bootstrap/esm/Container.js";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../user/UserContext";

function StandingOrderList() {
    const { standingOrderList } = useContext(StandingOrderListContext);
    const [showStandingOrderForm, setShowStandingOrderForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const [filteredStandingOrderList, setFilteredStandingOrderList] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const { loggedInUser } = useContext(UserContext);
    const [i, setI] = useState(8);


    const getMore = () => {
        setI(prevI => prevI + 4); // Incrementing i by 4 when the button is clicked
    };

    useEffect(() => {
        if (location.pathname === "/TranList") {
            setFilteredStandingOrderList(standingOrderList.slice(0, i));
        } else {
            setFilteredStandingOrderList(standingOrderList.slice(0, 4));
        }
    }, [location.pathname, standingOrderList, i]);

    return (
        <Container>
            {!!showStandingOrderForm ? (
                <StandingOrderForm standingOrder={showStandingOrderForm} setShowStandingOrderForm={setShowStandingOrderForm}/>
            ) : null}
            {!!showConfirmDeleteDialog ? (
                <ConfirmDeleteDialog
                    standingOrder={showConfirmDeleteDialog}
                    setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                />
            ) : null}
            {filteredStandingOrderList.map((standingOrder) => {
                return (
                    <StandingOrderCard
                        key={standingOrder.id}
                        standingOrder={standingOrder}
                        setShowStandingOrderForm={setShowStandingOrderForm}
                        setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    />
                );
            })}
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {!loggedInUser ? (
                    <p></p>
                ) : (
                    location.pathname === "/standingOrders" ? (
                        <Button size="sm" onClick={getMore}>
                            <label>See more</label>
                        </Button>
                    ) : (
                        <Button size="sm" onClick={() => navigate("/standingOrders")}>
                            <label>See More</label>
                        </Button>
                    )
                )}
            </div>
        </Container>
    );
}

export default StandingOrderList;