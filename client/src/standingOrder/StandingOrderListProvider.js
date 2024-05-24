import { useEffect, useState, useContext } from "react";
import { StandingOrderListContext } from "./StandingOrderListContext.js";
import { UserContext } from "../user/UserContext";



function StandingOrderListProvider({ children }) {
    const [standingOrderLoadObject, setStandingOrderLoadObject] = useState({
        state: "ready",
        error: null,
        data: null,
    });

    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        handleLoad();
    }, [loggedInUser]);

    async function handleLoad() {
        if (!loggedInUser) {
            setStandingOrderLoadObject({
                state: "ready",
                data: null,
            });
            return;
        }

        setStandingOrderLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/standingOrder/list`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            const filteredStandingOrders = responseJson.filter(standingOrder => standingOrder.userId === loggedInUser.id);

            const combinedStandingOrders = [
                ...standingOrderLoadObject.data || [], // Existing transactions
                ...filteredStandingOrders // Newly loaded transactions
            ];

            // Sort the combined transactions
            combinedStandingOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

            setStandingOrderLoadObject({ state: "ready", data: combinedStandingOrders });
            return filteredStandingOrders;
        } else {
            setStandingOrderLoadObject((current) => ({
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
            setStandingOrderLoadObject((current) => ({...current, state: "pending"}));
            const response = await fetch(`http://localhost:8000/standingOrder/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dtoIn),
            });
            const responseJson = await response.json();

            if (response.status < 400) {
                setStandingOrderLoadObject((current) => {
                    current.data.push(responseJson);
                    current.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    return {state: "ready", data: current.data};
                });
                return responseJson;
            } else {
                setStandingOrderLoadObject((current) => {
                    return {state: "error", data: current.data, error: responseJson};
                });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function handleUpdate(dtoIn) {
        setStandingOrderLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/standingOrder/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setStandingOrderLoadObject((current) => {
                const standingOrderIndex = current.data.findIndex(
                    (e) => e.id === responseJson.id
                );
                current.data[standingOrderIndex] = responseJson;
                current.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setStandingOrderLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleDelete(dtoIn) {
        setStandingOrderLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8000/standingOrder/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setStandingOrderLoadObject((current) => ({
                state: "ready",
                data: current.data.filter(standingOrder => standingOrder.id !== dtoIn.id),
            }));
            return responseJson;
        } else {
            setStandingOrderLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }


    const value = {
        state: standingOrderLoadObject.state,
        standingOrderList: standingOrderLoadObject.data || [],
        handlerMap: { handleCreate, handleUpdate, handleDelete },
    };

    return (
        <StandingOrderListContext.Provider value={value}>
            {children}
        </StandingOrderListContext.Provider>
    );
}

export default StandingOrderListProvider;