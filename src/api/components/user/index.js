const store = require("../../../store/mysql");
const controller = require("./userController");

module.exports = controller(store);
