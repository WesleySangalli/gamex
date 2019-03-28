const config = {
  port: 9080,
  db: {
    uri: "mongodb://127.0.0.1:27017/gamexdb"
  },
  logger: {
    console: {
      level: "debug",
      handleExceptions: true,
      json: true,
      colorize: true
    }
  }
};

export default config;
