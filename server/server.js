const express = require('express')
const app = express()

const transactionController = require("./controller/transaction");
const userController = require("./controller/user");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/transaction", transactionController);
app.use("/user", userController);

app.listen(8000,() => {console.log("Started at port 8000")})