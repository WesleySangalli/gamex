const gamesSchema = require("../models/gamesSchema");
const logger = require("../logger/logger");

const getAvailablePlatforms = platform => {
  if (!platform) {
    return Promise.reject("Platform cannot be null");
  }

  const platformQuery = {
    Platform: new RegExp(["^", platform, "$"].join(""), "i")
  };
  logger.debug(
    `Searching games with search params ${JSON.stringify(platformQuery)}`
  );
  return new Promise((resolve, reject) => {
    gamesSchema
      .distinct("Platform")
      .then(result => {
        logger.debug(`Returning ${result.length} results`);
        resolve(result);
      })
      .catch(err => reject(err)); 
  });
};

const getGamesForPlatform = platform => {
  if (!platform) {
    return Promise.reject("Platform cannot be null");
  }

  const platformQuery = {
    Platform: new RegExp(["^", platform, "$"].join(""), "i")
  };
  logger.debug(
    `Searching games with search params ${JSON.stringify(platformQuery)}`
  );
  return new Promise((resolve, reject) => {
    gamesSchema
      .find(platformQuery)
      .sort({ Year_of_Release: -1 })
      .then(result => {
        logger.debug(`Returning ${result.length} results`);
        resolve(result);
      })
      .catch(err => reject(err));
  });
};

module.exports = { getAvailablePlatforms, getGamesForPlatform };
