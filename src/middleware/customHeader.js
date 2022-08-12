const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    console.log(req.headers);
    if (apiKey == "hola") {
      next();
    } else {
      return res.status(401).send({
        status: "error",
        message: "API-KEY INVALID",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: "error",
      message: e.toString(),
    });
  }
};

module.exports = customHeader;
