const mysql = require("mysql2");
const config = require("../config");
const logger = require("../utils/logger")("MySQL");
const _ = require("lodash");
const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConf);
  connection.connect((err) => {
    if (err) {
      logger.error(err);
      setTimeout(handleCon, 2000);
    } else {
      logger.info("Database connected 🤟");
    }
  });

  connection.on("error", (err) => {
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
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);

      return resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ID = '${id}'`,
      (err, data) => {
        if (err) return reject(err);
        return resolve(data.length ? data[0] : {});
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [data, data.id],
      (err) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
}

async function upsert(table, data) {
  let row = [];
  if (data.id) {
    row = await get(table, data.id);
  }

  if (!row.length) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
}

function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, res) => {
        if (err) return reject(err);
        resolve(res || null);
      }
    );
  });
}

function remove(table, firstCondition, othersCondition = []) {
  let andConditions = "";
  if (othersCondition.length > 0) {
    andConditions = othersCondition.map((c) => "AND ?").join(" ");
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE ? ${andConditions}`,
      [firstCondition, ...othersCondition],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
  remove,
};
