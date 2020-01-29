const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");
const httpStatus = require("http-status-codes");

router.post("/login", (req, res) => {
  controller
    .login(req.body.username, req.body.password)
    .then(token => {
      response.success(req, res, token);
    })
    .catch(e => {
      response.error(req, res, "Invalid data", httpStatus.BAD_REQUEST);
    });
});

module.exports = router;
