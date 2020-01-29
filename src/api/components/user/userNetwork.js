const express = require("express");
const router = express.Router();
const response = require("../../../network/response");
const controller = require("./index");
const secure = require("./userSecure");

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

router.get("/:id", (req, res) => {
  controller
    .get(req.params.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(e => {
      response.error(req, res, e);
    });
});

router.post("/", (req, res) => {
  controller
    .add(req.body)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(e => {
      response.error(req, res, e);
    });
});

router.put("/", secure("update"), (req, res) => {
  controller
    .update(req.body)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(e => {
      response.error(req, res, e);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .remove(req.params.id)
    .then(data => {
      response.success(req, res, data);
    })
    .catch(e => {
      response.error(req, res, e);
    });
});

module.exports = router;
