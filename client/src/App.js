import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./user/UserProvider";
import Layout from "./Layout";
import EventList from "./transactions/TransactionList";

import EventListProvider from "./transactions/TransactionListProvider";
import EventProvider from "./transactions/TransactionProvider";
import EventRoute from "./transactions/TransactionRoute";

function App() {
    return (
        <div style={componentStyle()}>
            <UserProvider>
                <EventListProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<EventList />} />
                                <Route
                                    path="eventDetail"
                                    element={
                                        <EventProvider>
                                            <EventRoute />
                                        </EventProvider>
                                    }
                                />
                                <Route path="*" element={"not found"} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </EventListProvider>
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