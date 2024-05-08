import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";


import Button from "react-bootstrap/esm/Button.js";

import TransactionForm from "./TransactionForm";
import TransactionCard from "./TransactionCard.js";
import Container from "react-bootstrap/esm/Container.js";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../user/UserContext";

function TransactionList() {
    const { transactionList } = useContext(TransactionListContext);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const navigate = useNavigate();

    console.log("showTransactionForm:", showTransactionForm);

    // nefunkcni
    const filteredTransactionList = transactionList.filter(
        (transaction) => new Date(transaction.date) > new Date()
    );

    const slicedTransactionList = transactionList.slice(0, 4);
    const { loggedInUser } = useContext(UserContext);

    return (
        <Container>
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
                {!loggedInUser ? (
                    <a>Please log-in</a>
                ) : (
                    <Button size="sm">
                        <label>See More</label>
                    </Button>
                )}
            </div>
        </Container>
    );
}

export default TransactionList;