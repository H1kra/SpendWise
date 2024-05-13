const express = require('express')
const app = express()
const cors = require("cors");

const transactionController = require("./controller/transaction");
const standingOrderController = require("./controller/standingOrder");
const userController = require("./controller/user");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/transaction", transactionController);
app.use("/standingOrder", standingOrderController)
app.use("/user", userController);

app.listen(8000,() => {console.log("Started at port 8000")})