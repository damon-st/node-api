const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const router = express.Router();
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

//TODO http://localhost/tracks GET,POST,DELETE,PUT

//list items
router.get("/", authMiddleware, getItems);

//obtner un solo item
router.get("/:id", validatorGetItem, getItem);

//list createItems
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);

//actualizar registro
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);

//delete
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
