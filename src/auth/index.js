const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/errors");
const httpStatus = require("http-status-codes");

const sign = data => {
  return jwt.sign(data, config.jwt.jwt_secret);
};

const verify = token => {
  return jwt.verify(token, config.jwt.jwt_secret);
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
  },
  logging: function(req) {
    const decoded = decodeHeader(req);
  }
};

const getToken = auth => {
  if (!auth) {
    throw error("There is no token", httpStatus.BAD_REQUEST);
  }

  if (auth.indexOf(config.jwt.auth_token_type) === -1) {
    throw error("Token type is not ok", httpStatus.BAD_REQUEST);
  }

  return auth.replace(config.jwt.auth_token_type, "");
};

const decodeHeader = req => {
  const authorization = req.headers.authorization;
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
};

module.exports = {
  sign,
  check
};
