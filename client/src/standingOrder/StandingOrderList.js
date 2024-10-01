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
    const { standingOrderList, handlerMap } = useContext(StandingOrderListContext);
    const [showStandingOrderForm, setShowStandingOrderForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const [filteredStandingOrderList, setFilteredStandingOrderList] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const { loggedInUser } = useContext(UserContext);
    const [pageSize, setPageSize] = useState(4);
    const [startIndex, setStartIndex] = useState(0);



    useEffect(() => {
        setFilteredStandingOrderList([]);
        setPageSize(4); // Reset page size
        setStartIndex(0); // Reset start index
    }, [loggedInUser]);

    useEffect(() => {
        const endIndex = Math.min(startIndex + pageSize, standingOrderList.length);
        setFilteredStandingOrderList(standingOrderList.slice(startIndex, endIndex));
    }, [standingOrderList, startIndex, pageSize]);

    const loadMoreStandingOrders= () => {
        setPageSize(prevPageSize => prevPageSize + 4);
    };

    return (
        <Container>
            {!!showStandingOrderForm ? (
                <StandingOrderForm standingOrder={showStandingOrderForm} setShowStandingOrderForm={setShowStandingOrderForm}/>
            ) : null}
            {!!showConfirmDeleteDialog ? (
                <ConfirmDeleteDialog
                    standingOrder={showConfirmDeleteDialog}
                    setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    onDelete={() => handlerMap.handleDelete(showConfirmDeleteDialog.id)}
                />
            ) : null}
            {filteredStandingOrderList.length === 0 && loggedInUser ? (
                <p>No standing orders available.</p>
            ) : (
                <>
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {!loggedInUser ? (
                            <p style={{ fontSize: "50px" }}></p>
                        ) : (
                            location.pathname === "/standingOrders" ? (
                                <Button size="sm" onClick={loadMoreStandingOrders}>
                                    <label>See more</label>
                                </Button>
                            ) : (
                                <Button size="sm" onClick={() => navigate("/standingOrders")}>
                                    <label>See More</label>
                                </Button>
                            )
                        )}
                    </div>
                </>
            )}
        </Container>
    );
}

export default StandingOrderList;