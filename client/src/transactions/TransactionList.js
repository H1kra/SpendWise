import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import TransactionCard from "./TransactionRecord";
import TransactionForm from "./TransactionForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function TransactionList() {
    const { transactionList } = useContext(TransactionListContext);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

    const filteredTransactionList = transactionList.filter(
        (transaction) => new Date(transaction.date) > new Date()
    );

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <Button variant="success" onClick={() => setShowTransactionForm({})}>
                    <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
                    událost
                </Button>
                <Button variant="success" disabled>
                    <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
                    Nové události
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
            {filteredTransactionList.map((transaction) => {
                return (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        setShowTransactionForm={setShowTransactionForm}
                        setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    />
                );
            })}
        </Container>
    );
}

export default TransactionList;