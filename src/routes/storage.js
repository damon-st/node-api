const express = require("express");
const {
  createItem,
  getItems,
  deleteItem,
  getItem,
} = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleStorage");
const router = express.Router();
const { validatorGetItem } = require("../validators/storage");

// Config multer;

//Get all items
router.get("/", getItems);
//get one item
router.get("/:id", validatorGetItem, getItem);
//delete ite,
router.delete("/:id", validatorGetItem, deleteItem);
//createItem
router.post("/", uploadMiddleware.single("myFile"), createItem);

module.exports = router;
