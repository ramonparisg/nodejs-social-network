const response = require("./response");
const logger = require("../utils/logger")("Middleware");

const error = (e, req, res, next) => {
  logger.error(e);
  response.error(req, res, e.message, e.statusCode);
};

module.exports = error;
