const store = require("../../../store/dummy");
const controller = require("./userController");

module.exports = controller(store);
