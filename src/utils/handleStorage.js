const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, collback) {
    const pathStorage = `${__dirname}/../storage`;
    collback(null, pathStorage);
  },
  filename: function (req, file, collback) {
    //TODO: mi-cv.pdg mi-gfo.png mi-vo.mp4
    const ext = file.originalname.split(".").pop();
    const fileName = `file-${Date.now()}.${ext}`;
    collback(null, fileName);
  },
});

const uploadMiddleware = multer({
  storage,
});

module.exports = uploadMiddleware;
