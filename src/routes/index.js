const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("Server is up!");
  next();
});

module.exports = router;
