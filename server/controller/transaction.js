const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/transaction/getAbl");
const ListAbl = require("../abl/transaction/listAbl");
const CreateAbl = require("../abl/transaction/createAbl");
const EditAbl = require("../abl/transaction/editAbl");
const DeleteAbl = require("../abl/transaction/deleteAbl");

router.get("", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/edit", (req, res) => {
  EditAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;