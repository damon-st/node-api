const bcryptjs = require("bcryptjs");

const encrypt = async (passwordPlain) => {
  return bcryptjs.hash(passwordPlain, 10);
};

const compare = async (passwordPlain, hashPassword) => {
  return bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
