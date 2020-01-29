const TABLE = "auth";
const auth = require("../../../auth");
const bcrypt = require("bcrypt");

module.exports = injectedStore => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });
    const equals = await bcrypt.compare(password, data.password);

    if (equals) {
      return {
        token: auth.sign(data)
      };
    } else {
      throw new Error("Invalid data");
    }
  };

  async function upsert(data) {
    const authData = {
      id: data.id
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login
  };
};
