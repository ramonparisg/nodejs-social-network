const db = {
  user: [
    {
      id: "1",
      name: "Ramón"
    },
    {
      id: "2",
      name: "Génesis"
    }
  ]
};

const list = async table => {
  return db[table] || [];
};

const get = async (table, id) => {
  const t = await list(table);
  return t.find(item => item.id === id) || null;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  const t = await list(table);
  const indexToUpdate = t.findIndex(row => row.id === data.id);
  if (indexToUpdate !== -1) {
    t[indexToUpdate] = { ...t[indexToUpdate], ...data };
  } else {
    t.push(data);
  }

  return data;
};

const remove = async (table, id) => {
  db[table] = db[table].filter(data => data.id !== id);
  return true;
};

const query = async (table, q) => {
  const t = await list(table);
  const keys = Object.keys(q);
  const key = keys[0];
  return t.find(item => item[key] === q[key]) || null;
};

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};
