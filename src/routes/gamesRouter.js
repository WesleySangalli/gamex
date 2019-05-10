const router = require("express").Router();
const gamesRepository = require("../repository/gamesRepository");
const logger = require("../logger/logger");

router.get("/", (req, res, next) => {
  try {
    gamesRepository.find(req.query).then(result => res.json(result || {}));
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});

module.exports = router;
