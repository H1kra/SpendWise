import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";


import Button from "react-bootstrap/esm/Button.js";

import TransactionCard from "./TransactionCard.js";
import TransactionForm from "./TransactionForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import {useNavigate} from "react-router-dom";

function TransactionList() {
    const { transactionList } = useContext(TransactionListContext);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const navigate = useNavigate();

    // nefunkcni
    const filteredTransactionList = transactionList.filter(
        (transaction) => new Date(transaction.date) > new Date()
    );


    const slicedTransactionList = transactionList.slice(0, 4);
    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <Button variant="success" onClick={() => setShowTransactionForm({})}>
                    <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
                    transakce
                </Button>
            </div>
            {!!showTransactionForm ? (
                <TransactionForm transaction={showTransactionForm} setShowTransactionForm={setShowTransactionForm} />
            ) : null}
            {!!showConfirmDeleteDialog ? (
                <ConfirmDeleteDialog
                    transaction={showConfirmDeleteDialog}
                    setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                />
            ) : null}
            {slicedTransactionList.map((transaction) => {
                return (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        setShowTransactionForm={setShowTransactionForm}
                        setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    />
                );
            })}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() => navigate("/")}
                    size={"sm"}
                >
                    <label>See More</label>
                </Button>
            </div>
        </Container>
    );
}

export default TransactionList;