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

router.get("/followers", secure("follow"), (req, res, next) => {
  controller
    .findFollowers(req.user.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

router.get("/followings", secure("follow"), (req, res, next) => {
  controller
    .findFollowings(req.user.id)
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

router.post("/follow/:id", secure("follow"), (req, res, next) => {
  controller
    .follow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

router.delete("/unfollow/:id", secure("follow"), (req, res, next) => {
  controller
    .unfollow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(next);
});

module.exports = router;
