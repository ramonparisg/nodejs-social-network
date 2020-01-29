module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
    JWT_SECRET: process.env.SECRET_KEY || "secret",
    AUTH_TOKEN_TYPE: process.env.AUTH_TOKEN_TYPE || "Bearer "
  }
};
