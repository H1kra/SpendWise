const express = require('express')
const app = express()
const cors = require("cors");
const cron = require("node-cron");
const standingOrderDAO = require("./dao/standingOrder-dao");
const transactionDAO = require("./dao/transaction-dao");

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

cron.schedule("37 14 * * *", () => {
    const today = new Date();
    const dayOfMonth = today.getDate();

    const standingOrders = standingOrderDAO.list();
    standingOrders.forEach((order) => {
        const startDate = new Date(order.startDate);
        const endDate = new Date(order.endDate);
        if (
            today >= startDate && today <= endDate &&
            dayOfMonth === startDate.getDate()
        ) {
            const transaction = {
                userId: order.userId,
                label: order.label,
                amount: order.amount,
                type: order.type,
                date: today.toISOString(),
                note: order.note,
            };
            transactionDAO.create(transaction);
        }
    });
});

app.listen(8000,() => {console.log("Started at port 8000")})