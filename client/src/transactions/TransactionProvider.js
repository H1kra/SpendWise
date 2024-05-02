import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { TransactionContext } from "./TransactionContext.js";

function TransactionProvider({ children }) {
    const [transactionLoadObject, setTransactionLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    });
    const location = useLocation();
    console.log(location);

    const [searchParams] = useSearchParams();

    console.log(searchParams.get("id"));

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setTransactionLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(
            `http://localhost:8000/transaction/?id=${new URLSearchParams(
                location.search
            ).get("id")}`,
            {
                method: "GET",
            }
        );
        const responseJson = await response.json();
        if (response.status < 400) {
            setTransactionLoadObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setTransactionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }
    const value = {
        transaction: transactionLoadObject.data,
    };

    return (
        <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
    );
}

export default TransactionProvider;