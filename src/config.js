module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    jwt_secret: process.env.SECRET_KEY,
    auth_token_type: process.env.AUTH_TOKEN_TYPE || "Bearer ",
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
