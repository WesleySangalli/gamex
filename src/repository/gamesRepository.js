const gamesSchema = require("../models/gamesSchema");
const logger = require("../logger/logger");

const validateAndGetFindParams = params => {
  const search = {};
  if (params.name) {
    Object.assign(search, { Name: { $regex: params.name, $options: "i" } });
  }
  if (params.release) {
    Object.assign(search, { Year_of_Release: params.release });
  }
  return search;
};

const find = query => {
  const searchParam = validateAndGetFindParams(query);
  logger.debug(
    `Searching games with search params ${JSON.stringify(searchParam)}`
  );
  return new Promise((resolve, reject) => {
    gamesSchema
      .find(searchParam)
      .sort({ Year_of_Release: -1 }) // TODO: remove this hardcoded sort
      .then(result => {
        logger.debug(`Returning ${result.length} results`);
        resolve(result);
      })
      .catch(err => reject(err));
  });
};

module.exports = { find };
