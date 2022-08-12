const { encrypt, compare } = require("../utils/handlePassword");
const { userModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleErrors");
//Register users
const registerCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const passwordHast = await encrypt(body.password);
    const result = { ...body, password: passwordHast };
    const dataUser = await userModel.create(result);

    const token = await tokenSign(dataUser);

    const data = {
      token,
      user: dataUser,
    };

    return res.status(200).send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR AUTH REGISTER " + e.toString(), 500);
    return;
  }
};

//login
const loginCtrl = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await userModel
      .findOne({ email: body.email })
      .select("password name role email");
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const hasPassword = user.password;
    const check = await compare(body.password, hasPassword);
    if (!check) {
      handleHttpError(res, "ERROR NO AUTHENTICATE", 401);
      return;
    }
    const token = await tokenSign(user);
    user.set("password", undefined, { strict: false });
    const data = {
      token,
      user,
    };
    return res.status(200).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR AUTH LOGIN: " + error.toString(), 500);
    return;
  }
};

module.exports = { loginCtrl, registerCtrl };
