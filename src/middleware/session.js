const { handleHttpError } = require("../utils/handleErrors");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");

const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NO_TOKEN", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();

    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NO PAYLOAD DATA", 401);
      return;
    }
    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };
    const user = await userModel.findOne(query);
    req.user = user;
    next();
  } catch (e) {
    handleHttpError(res, "ERROR AUTH SESSION" + e.toString());
  }
};

module.exports = authMiddleware;
