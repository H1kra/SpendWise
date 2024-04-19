const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv();
const bcrypt = require("bcrypt")
addFormats(ajv);


const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    surename: {type: "string"},
    email: { type: "string", format:"email"},
    password: { type: "string" }
  },
  required: ["name","surename" ,"email", "password"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let user = req.body;

    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.email === user.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
      return;
    }

    const hashPass = await bcrypt.hash(user.password, 10);
    user.password = hashPass

    user = userDao.create(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;