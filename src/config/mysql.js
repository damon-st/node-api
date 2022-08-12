const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSOWRD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

const dbConnectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection correcta");
  } catch (error) {
    console.log("MYSQL ERROR CONNECTION ", error);
  }
};

module.exports = { sequelize, dbConnectMySql };
