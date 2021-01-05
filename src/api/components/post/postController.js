const TABLE = "posts";
const nanoid = require("nanoid");

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(TABLE);
  };

  const findById = (id) => {
    return store.get(TABLE, id);
  };

  const add = (user, post) => {
    const body = { id: nanoid(), body: post.body, user };
    return store.upsert(TABLE, body);
  };

  return { list, findById, add };
};
