import * as restify from "restify";
import config from "./config"

const server = restify.createServer();

server.listen(config.port, () => {
  console.log(`Server UP ... Listening at port ${config.port}`)
})

server.get("/", (req, res) => {
  res.send({ message : "Hello Rest!"});
})