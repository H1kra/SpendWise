import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./user/UserProvider";
import Layout from "./Layout";
import TransactionList from "./transactions/TransactionList";

import TransactionListProvider from "./transactions/TransactionListProvider";
import TransactionProvider from "./transactions/TransactionProvider";
import TransactionRoute from "./transactions/TransactionRoute";

function App() {
    return (
        <div style={componentStyle()}>
            <UserProvider>
                <TransactionListProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<TransactionList />} />
                                <Route
                                    path="eventDetail"
                                    element={
                                        <TransactionProvider>
                                            <TransactionRoute />
                                        </TransactionProvider>
                                    }
                                />
                                <Route path="*" element={"not found"} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </TransactionListProvider>
            </UserProvider>
        </div>
    );
}

function componentStyle() {
    return {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#187bcd",
    };
}

export default App;