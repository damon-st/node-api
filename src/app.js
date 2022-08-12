const donEnv = require("dotenv");
donEnv.config();
const express = require("express");
const cors = require("cors");
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");

const loggetStream = require("./utils/handleLogger");
const morganBody = require("morgan-body");

const ENGINE_DB = process.env.ENGINE_DB;
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./src/storage"));

morganBody(app, {
  noColors: true,
  skip: function (req, res) {
    return res.statusCode < 400; //TODO 200 300 omitir
  },
  stream: loggetStream,
});

// Aqui routes
//TODO localhost/api/______
app.use("/api", require("./routes"));

ENGINE_DB === "nosql" ? dbConnectNoSql() : dbConnectMySql();
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
