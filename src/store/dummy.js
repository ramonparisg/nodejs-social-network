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
  return db[table];
};

const get = async (table, id) => {
  const t = await list(table);
  return t.find(item => item.id === id) || null;
};

const upsert = async (table, data) => {
  const t = await list(table);
  t.push(data);
};

const remove = async (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  upsert,
  remove
};
