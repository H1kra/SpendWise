import { useEffect, useState, useContext } from "react";
import { TransactionListContext } from "./TransactionListContext.js";
import { UserContext } from "../user/UserContext";


function TransactionListProvider({ children }) {
    const [transactionLoadObject, setTransactionLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    });

    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        handleLoad()
    }, [loggedInUser]);

    async function handleLoad() {
        if (!loggedInUser) {
            setTransactionLoadObject({
                state: "ready",
                data: null,
            });
            return;
        }

        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/list`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            const filteredTransactions = responseJson.filter(transaction => transaction.userId === loggedInUser.id);

            const combinedTransactions = [
                ...transactionLoadObject.data || [], // Existing transactions
                ...filteredTransactions // Newly loaded transactions
            ];

            // Sort the combined transactions
            combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

            setTransactionLoadObject({ state: "ready", data: combinedTransactions });
            return filteredTransactions;
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleCreate(dtoIn) {
        if (!loggedInUser) return;

        try {
            dtoIn.userId = loggedInUser.id;
            setTransactionLoadObject((current) => ({...current, state: "pending"}));
            const response = await fetch(`http://localhost:8000/transaction/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dtoIn),
            });
            const responseJson = await response.json();

            if (response.status < 400) {
                setTransactionLoadObject((current) => {
                    current.data.push(responseJson);
                    current.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    return {state: "ready", data: current.data};
                });
                return responseJson;
            } else {
                setTransactionLoadObject((current) => {
                    return {state: "error", data: current.data, error: responseJson};
                });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function handleUpdate(dtoIn) {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setTransactionLoadObject((current) => {
                const transactionIndex = current.data.findIndex(
                    (e) => e.id === responseJson.id
                );
                current.data[transactionIndex] = responseJson;
                current.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleDelete(dtoIn) {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/transaction/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setTransactionLoadObject((current) => ({
                state: "ready",
                data: current.data.filter(transaction => transaction.id !== dtoIn.id),
            }));
            return responseJson;
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }


    const value = {
        state: transactionLoadObject.state,
        transactionList: transactionLoadObject.data || [],
        handlerMap: { handleCreate, handleUpdate, handleDelete },
    };

    return (
        <TransactionListContext.Provider value={value}>
            {children}
        </TransactionListContext.Provider>
    );
}

export default TransactionListProvider;