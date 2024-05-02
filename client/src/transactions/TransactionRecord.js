import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import TransactionDateTimeBadge from "./TransactionDateBadge";


import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function TransactionCard({ transaction, setShowTransactionForm, setShowConfirmDeleteDialog }) {
    const navigate = useNavigate();

    return (
        <div className="card border-0 shadow rounded" style={componentStyle()}>
            <TransactionDateTimeBadge transaction={transaction} />
            <div
                style={{
                    display: "grid",
                    gap: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button onClick={() => setShowTransactionForm(transaction)} size={"sm"}>
                    <Icon path={mdiPencil} size={0.7} />
                </Button>
                <Button
                    onClick={() => setShowConfirmDeleteDialog(transaction)}
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

export default TransactionCard;