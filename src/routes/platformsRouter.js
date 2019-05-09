const router = require("express").Router();
const platformsRepository = require("../repository/platformsRepository");

router.get("/", (req, res, next) => {
  platformsRepository
    .getAvailablePlatforms(req.query)
    .then(result => res.json(result || {}))
    .catch(err => res.status(400).send(err));
});

router.get("/:platform/games", (req, res, next) => {
  platformsRepository
    .getGamesForPlatform(req.params.platform)
    .then(result => res.json(result || {}))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
