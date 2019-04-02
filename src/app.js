require("./database/mongoConnector");

const morgan = require("morgan");
const express = require("express");
const config = require("./config/appconfig");
const logger = require("./logger/logger");

//Routers
const index = require("./routes/index");
const games = require("./routes/games");

const server = express();
// Setting up logger
server.use(morgan("combined", { stream: process.stdout }));
server.use(express.json());

// Setting up middleware
server.use(express.json());

// Setting up routes
server.use("/", index);
server.use("/games", games);

// Bringing application to life
server.listen(config.port, () => {
  logger.info(`Server UP ... Listening at port ${config.port}`);
});
