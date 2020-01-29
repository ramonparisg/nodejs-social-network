const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/errors");
const httpStatus = require("http-status-codes");

const sign = data => {
  return jwt.sign(data, config.api.JWT_SECRET);
};

const verify = token => {
  return jwt.verify(token, config.api.JWT_SECRET);
};

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);

    if (decoded.id !== owner) {
      throw error(
        "You don't have permissions to do this",
        httpStatus.UNAUTHORIZED
      );
    }
  }
};

const getToken = auth => {
  if (!auth) {
    throw error("There is no token", httpStatus.BAD_REQUEST);
  }

  if (auth.indexOf(config.api.AUTH_TOKEN_TYPE) === -1) {
    throw error("Token type is not ok", httpStatus.BAD_REQUEST);
  }

  return auth.replace(config.api.AUTH_TOKEN_TYPE, "");
};

const decodeHeader = req => {
  const authorization = req.headers.authorization;
  const token = getToken(authorization);
  const decoded = verify(token);

  return decoded;
};

module.exports = {
  sign,
  check
};
