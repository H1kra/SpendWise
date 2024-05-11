import { useContext, useState } from "react";
import { TransactionListContext } from "./TransactionListContext.js";


import Button from "react-bootstrap/esm/Button.js";

import TransactionForm from "./TransactionForm";
import TransactionCard from "./TransactionCard.js";
import Container from "react-bootstrap/esm/Container.js";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../user/UserContext";

function TransactionList() {
    const { transactionList } = useContext(TransactionListContext);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { loggedInUser } = useContext(UserContext);
    const [i, setI] = useState(8);

    let filteredTransactionList = transactionList;

    const getMore = () => {
        setI(prevI => prevI + 4); // Incrementing i by 4 when the button is clicked
    };

    if (location.pathname === "/TranList") {
        filteredTransactionList = transactionList.slice(0,i)
    } else {
        // Slice the transaction list
        filteredTransactionList = transactionList.slice(0, 4);
    }

    return (
        <Container>
            {!!showTransactionForm ? (
                <TransactionForm transaction={showTransactionForm} setShowTransactionForm={setShowTransactionForm}/>
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
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {!loggedInUser ? (
                    <p>Please log-in</p>
                ) : (
                    location.pathname === "/TranList" ? (
                        <Button size="sm" onClick={getMore}>
                            <label>See more</label>
                        </Button>
                    ) : (
                        <Button size="sm" onClick={() => navigate("/TranList")}>
                            <label>See More</label>
                        </Button>
                    )
                )}
            </div>
        </Container>
    );
}

export default TransactionList;