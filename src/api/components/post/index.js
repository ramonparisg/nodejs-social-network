const store = require("../../../store/mysql");
const controller = require("./postController");

module.exports = controller(store);
