import * as mongoose from "mongoose";
import config from "../config/appconfig";

mongoose.connect(config.db.uri, { useNewUrlParser: true }).catch(err => {
  console.error(err);
});

const connection = mongoose.connection;

connection.on("open", () => console.log("Connected to mongodb"))
connection.on("error", (err) => console.error(`[Mongo] ERROR! ${err}`))
