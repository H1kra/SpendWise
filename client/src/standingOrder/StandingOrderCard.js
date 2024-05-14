import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import StandingOrderDateTimeBadge from "./StandingOrderDateTimeBadge";
import StandingOrderDetail from "./StandingOrderDetail";

import Icon from "@mdi/react";
import {  mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function StandingOrderCard({ standingOrder, setShowStandingOrderForm, setShowConfirmDeleteDialog }) {
    const navigate = useNavigate();

    return (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
            <StandingOrderDateTimeBadge standingOrder={standingOrder}/>
            <StandingOrderDetail standingOrder={standingOrder} />
            <div
                style={{
                    display: "grid",
                    gap: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button onClick={() => setShowStandingOrderForm(standingOrder)} size={"sm"} style={buttonStyle()}>
                    <Icon path={mdiPencil} size={0.7} />
                </Button>
                <Button
                    onClick={() => setShowConfirmDeleteDialog(standingOrder)}
                    size={"sm"}
                    variant="danger"
                    style={buttonStyle()}
                >
                    <Icon path={mdiTrashCanOutline} size={0.7} />
                </Button>
            </div>
        </div>
    );
}

function buttonStyle(){
    return {
        color: "black",
        backgroundColor: "lightgrey",
        border: "solid black 1px"
    }
}

function componentStyle() {
    return {
        margin: "12px auto",
        padding: "8px",
        display: "grid",
        gridTemplateColumns: "max-content auto 32px",
        columnGap: "8px",
        maxWidth: "640px",
        border: "solid black 1px",
        borderRadius: "5px",
        overflow: "hidden"
    };
}

export default StandingOrderCard;