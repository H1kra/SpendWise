const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/standingOrder/getAbl");
const ListAbl = require("../abl/standingOrder/listAbl");
const CreateAbl = require("../abl/standingOrder/createAbl");
const EditAbl = require("../abl/standingOrder/editAbl");
const DeleteAbl = require("../abl/standingOrder/deleteAbl");

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