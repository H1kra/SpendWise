const standingOrderDao = require("../../dao/standingOrder-dao.js");

async function ListAbl(req, res) {
  try {

    const standingOrderList = standingOrderDao.list();

    res.json(standingOrderList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;