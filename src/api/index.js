require("dotenv").config();

const express = require("express");
const config = require("../config");
const user = require("./components/user/userNetwork");

const app = express();

app.use("/user", user);

app.listen(config.api.port, () => {
  console.log(`API listening on port ${config.api.port} 🚀`);
});
