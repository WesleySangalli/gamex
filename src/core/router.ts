import * as restify from "restify";
import config from "../config/appconfig";

import games from "../models/games";

const server = restify.createServer();

server.listen(config.port, () => {
  console.log(`Server UP ... Listening at port ${config.port}`);
});

server.get("/", (req, res) => {
  res.send({ message: "OK!" });
});

server.get("/games", (req, res) => {
  games.find().then(gameList => res.json(gameList || []));
});
