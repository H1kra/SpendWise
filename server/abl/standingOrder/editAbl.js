const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const standingOrderDao = require("../../dao/standingOrder-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    label: { type: "string" },
    amount: {type: "number"},
    type: { type: "string", enum: ["income", "expense"] },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
    note: { type: "string"},
  },
  required: ["id"],
  additionalProperties: false,
};

async function EditAbl(req, res) {
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

    const editedStandingOrder = standingOrderDao.edit(standingOrder);
    if (!editedStandingOrder) {
      res.status(404).json({
        code: "standingOrderNotFound",
        message: `Standing Order ${standingOrder.id} not found`,
      });
      return;
    }

    res.json(editedStandingOrder);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = EditAbl;