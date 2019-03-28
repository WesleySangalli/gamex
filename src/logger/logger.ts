import * as winston from "winston";
import config from "../config/appconfig";

const logger = winston.createLogger({
  transports: [new winston.transports.Console(config.logger.console)],
  exitOnError: false
});

export default logger;
