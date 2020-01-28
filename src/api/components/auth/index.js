const store = require("../../../store/dummy");
const controller = require("./authController");

module.exports = controller(store);
