import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import EventDateTimeBadge from "./TransactionDateBadge";


import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function EventCard({ event, setShowEventForm, setShowConfirmDeleteDialog }) {
    const navigate = useNavigate();

    return (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
            <EventDateTimeBadge event={event} />
            <div
                style={{
                    display: "grid",
                    gap: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button onClick={() => setShowEventForm(event)} size={"sm"}>
                    <Icon path={mdiPencil} size={0.7} />
                </Button>
                <Button
                    onClick={() => setShowConfirmDeleteDialog(event)}
                    size={"sm"}
                    variant="danger"
                >
                    <Icon path={mdiTrashCanOutline} size={0.7} />
                </Button>
            </div>
        </div>
    );
}

function componentStyle() {
    return {
        margin: "12px auto",
        padding: "8px",
        display: "grid",
        gridTemplateColumns: "max-content auto 32px",
        columnGap: "8px",
        maxWidth: "640px",
    };
}

export default EventCard;