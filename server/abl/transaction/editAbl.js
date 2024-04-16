const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const transactionDao = require("../../dao/transaction-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    userId: { type: "string" },
    label: { type: "string" },
    amount: {type: "number"},
    type: { type: "string", enum: ["income", "expense"] },
    date: { type: "string", format: "date-time" },
    note: { type: "string"},
  },
  required: ["id", "userId"],
  additionalProperties: false,
};

async function EditAbl(req, res) {
  try {
    let transaction = req.body;

    // validate input
    const valid = ajv.validate(schema, transaction);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const editedTransaction = transactionDao.edit(transaction);
    if (!editedTransaction) {
      res.status(404).json({
        code: "transactionNotFound",
        message: `Transaction ${transaction.id} not found`,
      });
      return;
    }

    res.json(editedTransaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = EditAbl;