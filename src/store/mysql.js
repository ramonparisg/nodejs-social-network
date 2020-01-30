const mysql = require("mysql");
const config = require("../config");
const logger = require("../utils/logger")("MySQL");
const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConf);
  connection.connect(err => {
    if (err) {
      logger.error(err);
      setTimeout(handleCon, 2000);
    } else {
      logger.info("Database connected 🤟");
    }
  });

  connection.on("error", err => {
    logger.error(err);
    if (err === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM USERS", (err, data) => {
      if (err) return reject(err);

      return resolve(data);
    });
  });
}

module.exports = {
  list
};
