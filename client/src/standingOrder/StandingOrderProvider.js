import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { StandingOrderContext } from "./StandingOrderContext.js";

function StandingOrderProvider({ children }) {
    const [standingOrderLoadObject, setStandingOrderLoadObject] = useState({
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
        setStandingOrderLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(
            `http://localhost:8000/standingOrder/?id=${new URLSearchParams(
                location.search
            ).get("id")}`,
            {
                method: "GET",
            }
        );
        const responseJson = await response.json();
        if (response.status < 400) {
            setStandingOrderLoadObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setStandingOrderLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }
    const value = {
        transaction: standingOrderLoadObject.data,
    };

    return (
        <StandingOrderContext.Provider value={value}>{children}</StandingOrderContext.Provider>
    );
}

export default StandingOrderProvider;