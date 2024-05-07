const Ajv = require("ajv");
const ajv = new Ajv();
const transactionDao = require("../../dao/transaction-dao.js");
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    label: { type: "string" },
    amount: {type: "number"},
    type: { type: "string", enum: ["income", "expense"] },
    date: { type: "string", format: "date-time" },
    note: { type: "string"},
  },
  required: ["userId" ,"label", "amount", "type", "date"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let transaction = req.body;

    transaction.amount = parseFloat(transaction.amount);

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

    transaction = transactionDao.create(transaction);
    res.json(transaction);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;