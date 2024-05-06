import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "./user/UserProvider";
import Layout from "./Layout";
import TransactionList from "./transaction/TransactionList";
import TransactionListProvider from "./transaction/TransactionListProvider";
import TransactionProvider from "./transaction/TransactionProvider";
import TransactionRoute from "./transaction/TransactionRoute";
import TransactionForm from "./transaction/TransactionForm";


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
                                    path="transactionDetail"
                                    element={
                                        <TransactionProvider>
                                            <TransactionRoute />
                                        </TransactionProvider>
                                    }
                                />
                                <Route path="/transactionForm" element={<TransactionForm />} />
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
        backgroundColor: "white",
    };
}

export default App;