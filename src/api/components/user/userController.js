module.exports = injectedStore => {
  const store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const TABLE = "user";

  const list = () => {
    return store.list(TABLE);
  };

  const get = id => {
    return store.get(TABLE, id);
  };

  return {
    list,
    get
  };
};
