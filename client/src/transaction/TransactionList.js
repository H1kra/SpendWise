import {useContext, useEffect, useState} from "react";
import { TransactionListContext } from "./TransactionListContext.js";


import Button from "react-bootstrap/esm/Button.js";

import TransactionForm from "./TransactionForm";
import TransactionCard from "./TransactionCard.js";
import Container from "react-bootstrap/esm/Container.js";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";
import {useNavigate, useLocation} from "react-router-dom";
import {UserContext} from "../user/UserContext";

function TransactionList() {
    const { transactionList, handlerMap } = useContext(TransactionListContext);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const [filteredTransactionList, setFilteredTransactionList] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const { loggedInUser } = useContext(UserContext);
    const [pageSize, setPageSize] = useState(4);
    const [startIndex, setStartIndex] = useState(0);



    useEffect(() => {
        // Reset transaction list when user logs out or switches
        setFilteredTransactionList([]);
        setPageSize(4); // Reset page size
        setStartIndex(0); // Reset start index
    }, [loggedInUser]);

    useEffect(() => {
        const endIndex = Math.min(startIndex + pageSize, transactionList.length);
        setFilteredTransactionList(transactionList.slice(startIndex, endIndex));
    }, [transactionList, startIndex, pageSize]);

    const loadMoreTransactions = () => {
        setPageSize(prevPageSize => prevPageSize + 4);
    };


    return (
        <Container>
            {!!showTransactionForm ? (
                <TransactionForm transaction={showTransactionForm} setShowTransactionForm={setShowTransactionForm}/>
            ) : null}
            {!!showConfirmDeleteDialog ? (
                <ConfirmDeleteDialog
                    transaction={showConfirmDeleteDialog}
                    setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    onDelete={() => handlerMap.handleDelete(showConfirmDeleteDialog.id)}
                />
            ) : null}
            {filteredTransactionList.length === 0 && loggedInUser ? (
                <p>No transactions available.</p>
            ) : (
                <>
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {!loggedInUser ? (
                            <p style={{ fontSize: "50px" }}>Please log-in</p>
                        ) : (
                            location.pathname === "/TranList" ? (
                                <Button size="sm" onClick={loadMoreTransactions}>
                                    <label>See more</label>
                                </Button>
                            ) : (
                                <Button size="sm" onClick={() => navigate("/TranList")}>
                                    <label>See More</label>
                                </Button>
                            )
                        )}
                    </div>
                </>
            )}
        </Container>
    );
}

export default TransactionList;