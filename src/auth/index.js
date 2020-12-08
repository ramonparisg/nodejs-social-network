const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/errors");
const moment = require("moment");
const httpStatus = require("http-status-codes");

const sign = (data) => {
  const expirationDate = moment().add(1, "hour").unix();
  return jwt.sign({ ...data, exp: expirationDate }, config.jwt.jwt_secret);
};

const verify = (token) => {
  return jwt.verify(token, config.jwt.jwt_secret);
};

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);

    if (decoded.id !== owner) {
      throw error(
        "You don't have permissions to do this",
        httpStatus.UNAUTHORIZED
      );
    }
  },
  logging: function (req) {
    decodeHeader(req);
  },
};

const getToken = (auth) => {
  if (!auth) {
    throw error("There is no token", httpStatus.BAD_REQUEST);
  }

  if (auth.indexOf(config.jwt.auth_token_type) === -1) {
    throw error("Token type is not ok", httpStatus.BAD_REQUEST);
  }

  return auth.replace(config.jwt.auth_token_type, "");
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization;
  const token = getToken(authorization);
  try {
    const decoded = verify(token);
    req.user = decoded;

    return decoded;
  } catch (e) {
    throw error(e.message, httpStatus.UNAUTHORIZED);
  }
};

module.exports = {
  sign,
  check,
};
