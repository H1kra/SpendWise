import { useContext } from "react";
import { StandingOrderContext } from "./StandingOrderContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import StandingOrderDateTimeBadge from "./StandingOrderDateTimeBadge";

import Icon from "@mdi/react";
import { mdiPencil , mdiEyeOutline} from "@mdi/js";

function StandingOrderRoute({ setShowStandingOrderForm }) {
    const navigate = useNavigate();
    const { standingOrder } = useContext(StandingOrderContext);

    return (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
            {transaction ? (
                <>
                    <StandingOrderDateTimeBadge standingOrder={standingOrder} />
                    <div
                        style={{
                            display: "grid",
                            gap: "2px",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            onClick={() => navigate("/standingOrderDetail?id=" + StandingOrder.id)}
                            size={"sm"}
                        >
                            <Icon path={mdiEyeOutline} size={0.7} />
                        </Button>
                        <Button onClick={() => setShowStandingOrderForm(standingOrder)} size={"sm"}>
                            <Icon path={mdiPencil} size={0.7} />
                        </Button>
                    </div>
                </>
            ) : (
                "loading..."
            )}
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

export default StandingOrderRoute;