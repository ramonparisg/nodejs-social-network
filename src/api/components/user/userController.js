const TABLE = "users";
const auth = require("../auth");
const nanoid = require("nanoid");

module.exports = injectedStore => {
  const store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(TABLE);
  };

  const get = id => {
    return store.get(TABLE, id);
  };

  const add = async userRequest => {
    let calculatedId = userRequest.id;
    if (!calculatedId) {
      calculatedId = nanoid();
    }

    const user = {
      id: calculatedId,
      name: userRequest.name,
      username: userRequest.username
    };

    if (userRequest.password || userRequest.username) {
      await auth.upsert({
        id: calculatedId,
        username: userRequest.username,
        password: userRequest.password
      });
    }

    return store.upsert(TABLE, user);
  };

  const update = async userRequest => {
    let user = await get(userRequest.id);

    if (!user || user.length === 0) {
      return Promise.reject(`User ${userRequest.id} does not exist`);
    } else {
      user = { ...user[0] };
    }

    if (userRequest.username) {
      user.username = userRequest.username;
    }

    if (userRequest.name) {
      user.name = userRequest.name;
    }

    if (userRequest.password || userRequest.username) {
      await auth.upsert({
        id: user.id,
        username: userRequest.username,
        password: userRequest.password
      });
    }

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
