import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./user/UserProvider";
import Layout from "./Layout";



function App() {
    return (
        <div style={componentStyle()}>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                        </Route>
                    </Routes>
                </BrowserRouter>
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
