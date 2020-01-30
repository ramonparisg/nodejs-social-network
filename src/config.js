module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    jwt_secret: process.env.SECRET_KEY || "secret",
    auth_token_type: process.env.AUTH_TOKEN_TYPE || "Bearer "
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "nodeuser",
    password: process.env.MYSQL_PASSWORD || "nodeuser",
    database: process.env.MYSQL_DATABASE || "socialnetwork"
  }
};
