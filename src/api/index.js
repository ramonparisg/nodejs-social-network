require("dotenv").config();

const express = require("express");
const config = require("../config");
const user = require("./components/user/userNetwork");
const auth = require("./components/auth/authNetwork");
const post = require("./components/post/postNetwork");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const error = require("../network/error");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(error);

app.listen(config.api.port, () => {
  console.log(`API listening on port ${config.api.port} 🚀`);
});
