import { useContext, useState } from "react";
import { StandingOrderListContext } from "./StandingOrderListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function ConfirmDeleteDialog({ setShowConfirmDeleteDialog, standingOrder }) {
    const { state, handlerMap } = useContext(StandingOrderListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    const handleDelete = async () => {
        try {
            await handlerMap.handleDelete({ id: standingOrder.id });
            setShowConfirmDeleteDialog(false);
        } catch (error) {
            console.error(error);
            setShowAlert(error.message);
        }
    };

    return (
        <Modal show={true} onHide={() => setShowConfirmDeleteDialog(false)}>
            <Modal.Header>
                <Modal.Title>Delete Standing Order</Modal.Title>
                <CloseButton onClick={() => setShowConfirmDeleteDialog(false)} />
            </Modal.Header>
            <Modal.Body style={{ position: "relative" }}>
                <Alert
                    show={!!showAlert}
                    variant="danger"
                    dismissible
                    onClose={() => setShowAlert(null)}
                >
                    <Alert.Heading>Unable to create Standing Order</Alert.Heading>
                    <pre>{showAlert}</pre>
                </Alert>
                {isPending ? (
                    <div style={pendingStyle()}>
                        <Icon path={mdiLoading} size={2} spin />
                    </div>
                ) : null}
                Do you really want to delete Standing Order {standingOrder.label}?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setShowConfirmDeleteDialog(false)}
                    disabled={isPending}
                >
                    Close
                </Button>
                <Button
                    type="submit"
                    variant="danger"
                    disabled={isPending}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function pendingStyle() {
    return {
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        opacity: "0.5",
    };
}

export default ConfirmDeleteDialog;