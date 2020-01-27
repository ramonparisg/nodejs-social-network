const store = require("../../../store/dummy");

const TABLE = "user";

const list = () => {
  return new Promise((resolve, reject) => {
    resolve(store.list(TABLE));
  });
};

module.exports = {
  list
};
