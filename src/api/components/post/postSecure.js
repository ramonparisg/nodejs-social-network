const auth = require("../../../auth");
const controller = require("./index");

module.exports = (action) => {
  function middleware(req, res, next) {
    switch (action) {
      case "identify":
        auth.check.logging(req);
        next();
        break;
      case "update":
        controller
          .findById(req.body.id)
          .then((data) => {
            auth.check.own(req, data.user);
            next();
          })
          .catch(next);
        break;
      case "remove":
        controller
          .findById(req.params.id)
          .then((data) => {
            auth.check.own(req, data.user);
            next();
          })
          .catch(next);
        break;
      default:
        next();
    }
  }

  return middleware;
};
