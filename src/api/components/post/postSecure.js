const auth = require("../../../auth");

module.exports = (action) => {
  function middleware(req, res, next) {
    switch (action) {
      case "identify":
        auth.check.logging(req);
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
};
