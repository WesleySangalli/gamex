const router = require("express").Router();
const gamesRepository = require("../repository/gamesRepository");

router.get("/", (req, res, next) => {
  gamesRepository
    .find(req.query)
    .then(result => res.json(result || {}))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
