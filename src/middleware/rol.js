const { handleHttpError } = require("../utils/handleErrors");
//rol con los permitidos
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role; //TODO ["user"],

    const checkValueRole = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRole) {
      handleHttpError(res, "USER NOT PERMISSIONS ", 401);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR: " + e.toString(), 500);
  }
};

module.exports = checkRol;
