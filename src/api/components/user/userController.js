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

  const add = userRequest => {
    const user = {
      id: userRequest.id,
      name: userRequest.name
    };

    return store.upsert(TABLE, user);
  };

  const update = userRequest => {
    const user = {
      id: userRequest.id,
      name: userRequest.name
    };

    return store.upsert(TABLE, user);
  };

  const remove = id => {
    return store.remove(TABLE, id);
  };

  return {
    list,
    get,
    add,
    remove,
    update
  };
};
