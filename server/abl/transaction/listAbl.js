const transactionDao = require("../../dao/transaction-dao.js");
const userDao = require("../../dao/user-dao.js"); // Assuming you have a user DAO

//doest work yet
async function ListAbl(req, res) {
  try {
    const transactionList = transactionDao.list();

    for (const transaction of transactionList) {
        const userData = await userDao.getUserById(transaction.userId); // Assuming userId is stored in transactions
        transaction.userMap = userData; // Assign user-related data to userMap property
      }


    res.json(transactionList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;