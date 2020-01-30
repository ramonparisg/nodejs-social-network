const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./userSecure");

router.get("/", (req, res, next) => {
  controller
    .list()
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  controller
    .get(req.params.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  controller
    .add(req.body)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

router.put("/", secure("update"), (req, res, next) => {
  controller
    .update(req.body)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  controller
    .remove(req.params.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

module.exports = router;
