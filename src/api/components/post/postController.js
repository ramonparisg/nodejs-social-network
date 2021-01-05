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

  const update = (post) => {
    const body = { id: post.id, body: post.body };
    return store.upsert(TABLE, body);
  };

  const remove = (id) => {
    return store.remove(TABLE, { id });
  };

  return { list, findById, add, update, remove };
};
