require("./database/mongoConnector");

const morgan = require("morgan");
const express = require("express");
const bodyParser = require('body-parser');
const config = require("./config/appconfig");
const logger = require("./logger/logger");

//Routers
const index = require("./routes/index");
const games = require("./routes/gamesRouter");
const platforms = require("./routes/platformsRouter");

const server = express();
// Setting up logger
server.use(morgan("combined", { stream: process.stdout }));
server.use(bodyParser.json());

// Setting up middleware
server.use(express.json());

// Setting up routes
server.use("/", index);
server.use("/games", games);
server.use("/platforms", platforms);

// Bringing application to life
server.listen(config.port, () => {
  logger.info(`Server UP ... Listening at port ${config.port}`);
});
