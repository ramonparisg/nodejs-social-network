require("dotenv").config();

const express = require("express");
const config = require("../config");
const user = require("./components/user/userNetwork");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", user);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
  console.log(`API listening on port ${config.api.port} 🚀`);
});
