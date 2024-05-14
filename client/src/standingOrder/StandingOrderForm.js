import { useContext, useState } from "react";
import { StandingOrderListContext } from "./StandingOrderListContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function StandingOrderForm({ setShowStandingOrderForm, standingOrder }) {
    const { state, handlerMap } = useContext(StandingOrderListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    return (
        <Modal show={true} onHide={() => setShowStandingOrderForm(false)}>
            <Form
                onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    let formData = Object.fromEntries(new FormData(e.target));
                    formData.startDate = new Date(formData.startDate).toISOString();
                    try {
                        if (standingOrder.id) {
                            formData.id = standingOrder.id;
                            await handlerMap.handleUpdate(formData);
                        } else {
                            await handlerMap.handleCreate(formData);
                        }

                        setShowStandingOrderForm(false);
                    } catch (e) {
                        console.error(e);
                        setShowAlert(e.message);
                    }
                }}
            >
                <Modal.Header>
                    <Modal.Title>{`${
                        standingOrder.id ? "Edit" : "Create"
                    } Standing Order`}</Modal.Title>
                    <CloseButton onClick={() => setShowStandingOrderForm(false)} />
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

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Label: </Form.Label>
                        <Form.Control
                            type="text"
                            name="label"
                            required
                            defaultValue={standingOrder.label}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>amount: </Form.Label>
                        <Form.Control
                            type="num"
                            step="0.01"
                            name="amount"
                            required
                            defaultValue={standingOrder.amount}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Type: </Form.Label>
                        <Form.Select
                            name="type"
                            required
                            defaultValue={standingOrder.type}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Start date: </Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="startDate"
                            required
                            defaultValue={
                                standingOrder.startDate ? standingOrderDateToInput(standingOrder.startDate) : undefined
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>End date: </Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="endDate"
                            required
                            defaultValue={
                                standingOrder.endDate ? standingOrderDateToInput(standingOrder.endDate) : undefined
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Note: </Form.Label>
                        <Form.Control
                            type="text"
                            name="note"
                            defaultValue={standingOrder.note}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowStandingOrderForm(false)}
                        disabled={isPending}
                    >
                        Close
                    </Button>
                    <Button type="submit" variant="primary" disabled={isPending}>
                        {standingOrder.id ? "Edit" : "Create"}
                    </Button>
                </Modal.Footer>
            </Form>
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

function standingOrderDateToInput(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default StandingOrderForm;