const winston = require("winston");
const config = require("../config/appconfig");

const logger = winston.createLogger({
  transports: [new winston.transports.Console(config.logger.console)],
  exitOnError: false
});

module.exports = logger;
