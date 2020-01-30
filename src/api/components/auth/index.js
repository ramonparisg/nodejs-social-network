const store = require("../../../store/mysql");
const controller = require("./authController");

module.exports = controller(store);
