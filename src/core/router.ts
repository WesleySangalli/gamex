import * as restify from "restify";
import * as plugins from "restify-plugins";
import * as errors from "restify-errors";
import * as morgan from "morgan";
import config from "../config/appconfig";
import games from "../models/games";
import logger from "../logger/logger";

const server = restify.createServer();
// Setting up logger
server.use(morgan("combined", { stream: process.stdout }));

// Setting up middleware
server.use(plugins.jsonBodyParser({ mapParams: true }));
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.fullResponse());
server.use(plugins.queryParser());

// Bringing application to life
server.listen(config.port, () => {
  logger.info(`Server UP ... Listening at port ${config.port}`);
});

// Setting up endpoints
server.get("/", (req, res, next) => {
  res.send(200);
  next();
});

server.get("/games", (req, res, next) => {
  games
    .find()
    .sort({ Year_of_Release: -1 })
    .then(list => res.json(list || {}));
  next();
});

server.post("/query", (req, res, next) => {
  logger.debug(req.body, "Received query request");

  if (!req.is("application/json")) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  const query = req.body || {};
  games.find(query).then(list => res.json(list || {}));
  next();
});

server.get("/games/:name", (req, res, next) => {
  const name = req.query.name;
  console.log(name);
  games
    .find({ Name: { $regex: name, $options: "i" } })
    .then(list => res.json(list || {}));
  next();
});
