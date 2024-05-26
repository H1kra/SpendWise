import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "./user/UserProvider";
import Layout from "./Layout";
import TransactionList from "./transaction/TransactionList";
import TransactionListProvider from "./transaction/TransactionListProvider";
import TransactionProvider from "./transaction/TransactionProvider";
import TransactionRoute from "./transaction/TransactionRoute";
import StandingOrderList from "./standingOrder/StandingOrderList";
import StandingOrderListProvider from "./standingOrder/StandingOrderListProvider";
import TransactionForm from "./transaction/TransactionForm";
import StandingOrderForm from "./standingOrder/StandingOrderForm";

//ss
function App() {
    const Dashboard = () => {
        console.log("Rendering Dashboard");
        return (
            <>
                <TransactionList />
                <StandingOrderList />
            </>
        );
    };

    return (
        <div style={componentStyle()}>
            <UserProvider>
                <TransactionListProvider>
                    <StandingOrderListProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route
                                        path="TranList"
                                        element={<TransactionList />}
                                    />
                                    <Route path="/transactionForm" element={<TransactionForm />} />
                                    <Route
                                        path="standingOrders"
                                        element={<StandingOrderList />}
                                    />
                                    <Route path="/standingOrderForm" element={<StandingOrderForm style={{top: "50px"}}/>} />
                                    <Route path="*" element={"not found"} />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </StandingOrderListProvider>
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