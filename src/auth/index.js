const jwt = require("jsonwebtoken");
const config = require("../config");

const sign = data => {
  return jwt.sign(data, config.api.JWT_SECRET);
};

const verify = token => {
  return jwt.verify(token, config.api.JWT_SECRET);
};

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw new Error("You don't have permissions to do this");
    }
  }
};

const getToken = auth => {
  if (!auth) {
    throw new Error("There is no token");
  }

  if (auth.indexOf(config.api.AUTH_TOKEN_TYPE) === -1) {
    throw new Error("Token type is not ok");
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
