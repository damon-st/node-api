const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
//Param objet USER
//firmar token
const tokenSign = async (user) => {
  return jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

//Debes pásar el toke de session el JWT
//verificar token
const verifyToken = async (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
