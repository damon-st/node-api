const express = require("express");
const { loginCtrl, registerCtrl } = require("../controllers/auth");
const router = express.Router();
const {
  validatorLoginUser,
  validatorRegisterUser,
} = require("../validators/auth");

router.post("/register", validatorRegisterUser, registerCtrl);

//list createItems
router.post("/login", validatorLoginUser, loginCtrl);

module.exports = router;
