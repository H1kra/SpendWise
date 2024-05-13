const Ajv = require("ajv");
const ajv = new Ajv();
const standingOrderDao = require("../../dao/standingOrder-dao.js");
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    label: { type: "string" },
    amount: {type: "number"},
    type: { type: "string", enum: ["income", "expense"] },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    note: { type: "string"},
  },
  required: ["userId" ,"label", "amount", "type", "startDate", "endDate"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let standingOrder = req.body;

    standingOrder.amount = parseFloat(standingOrder.amount);

    // validate input
    const valid = ajv.validate(schema, standingOrder);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    standingOrder = standingOrderDao.create(standingOrder);
    res.json(standingOrder);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;