const express = require("express");
const router = express.Router();
const gamesSchema = require("../models/gamesSchema");
const logger = require("../logger/logger");

const validateAndGetSearchParams = params => {
  const search = {};
  if (params.name) {
    Object.assign(search, { Name: { $regex: params.name, $options: "i" } });
  }
  if (params.release) {
    Object.assign(search, { Year_of_Release: params.release });
  }
  if (params.platform) {
    Object.assign(search, { Platform: params.platform });
  }
  return search;
};

router.get("/", (req, res, next) => {
  const search = validateAndGetSearchParams(req.query);
  gamesSchema
    .find(search)
    .sort({ Year_of_Release: -1 })
    .then(list => res.json(list || {}));
});

router.get("/platform/:platform", (req, res, next) => {
  const search = validateAndGetSearchParams(req.params);
  gamesSchema
    .find(search)
    .sort({ Year_of_Release: -1 })
    .then(list => res.json(list || {}));
});

module.exports = router;
