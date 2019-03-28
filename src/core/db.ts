import * as mongoose from "mongoose";
import config from "../config/appconfig";
import logger from "../logger/logger";

mongoose.connect(config.db.uri, { useNewUrlParser: true }).catch(err => {
  logger.error("Error connecting to mongodb", err);
});

const connection = mongoose.connection;

connection.on("open", () => logger.info("Connected to mongodb"));
connection.on("error", err => logger.error("[Mongodb] ERROR!", err));
