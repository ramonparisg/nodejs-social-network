const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./userController");

router.get("/", (req, res) => {
  controller
    .list()
    .then(data => {
      response.success(req, res, data);
    })
    .catch(e => {
      response.error(req, res, e);
    });
});

module.exports = router;
