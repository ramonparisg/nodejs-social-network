module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "secret"
  }
};
