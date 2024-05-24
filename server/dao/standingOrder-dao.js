const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const standingOrderFolderPath = path.join(__dirname, "storage", "standingOrderList");

// Method to read an event from a file
function get(standingOrderId) {
  try {
    const filePath = path.join(standingOrderFolderPath, `${standingOrderId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadStandingOrder", message: error.message };
  }
}

// Method to write an event to a file
function create(standingOrder) {
  try {
    standingOrder.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(standingOrderFolderPath, `${standingOrder.id}.json`);
    const fileData = JSON.stringify(standingOrder);
    fs.writeFileSync(filePath, fileData, "utf8");
    return standingOrder;
  } catch (error) {
    throw { code: "failedToCreateStandingOrder", message: error.message };
  }
}

// Method to update event in a file
function edit(standingOrder) {
  try {
    const currentStandingOrder = get(standingOrder.id);
    if (!currentStandingOrder) return null;
    const newStandingOrder = { ...currentStandingOrder, ...standingOrder };
    const filePath = path.join(standingOrderFolderPath, `${standingOrder.id}.json`);
    const fileData = JSON.stringify(newStandingOrder);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newStandingOrder;
  } catch (error) {
    throw { code: "failedToUpdateStandingOrder", message: error.message };
  }
}

// Method to remove an event from a file
function remove(standingOrderId) {
  try {
    const filePath = path.join(standingOrderFolderPath, `${standingOrderId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveStandingOrder", message: error.message };
  }
}

// Method to list events in a folder
function list() {
  try {
    const files = fs.readdirSync(standingOrderFolderPath);
    const standingOrderList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(standingOrderFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });

    standingOrderList.sort((a, b) => new Date(b.date) - new Date(a.date));
    return standingOrderList;
  } catch (error) {
    throw { code: "failedToListStandingOrder", message: error.message };
  }
}

module.exports = {
  get,
  create,
  edit,
  remove,
  list,
};