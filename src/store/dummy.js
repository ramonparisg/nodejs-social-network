const db = {
  user: [
    {
      id: 1,
      name: "Ramón"
    }
  ]
};

const list = table => {
  return db[table];
};

const get = (table, id) => {
  const t = list(table);
  return t.find(item => item.id === id);
};

const upsert = (table, data) => {
  const t = list(table);
  t.push(data);
};

const remove = (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  upsert,
  remove
};
