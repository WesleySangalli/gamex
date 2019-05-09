const gamesSchema = require("../models/gamesSchema");
const logger = require("../logger/logger");

const sortableColumns = {
  id: "Id",
  release: "Year_of_Release",
  score: "Critic_Score"
};
const sortableColumnsOrder = { asc: 1, desc: -1 };

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

const getSortParams = params => {
  const sort = {};
  if (params.sort) {
    let [column, order] = params.sort.split(":");
    order = order || "asc";

    if (sortableColumns.hasOwnProperty(column)) {
      Object.defineProperty(sort, sortableColumns[column], {
        value: sortableColumnsOrder[order]
      });
    }
  }
  return sort;
};

const find = query => {
  const searchParams = validateAndGetFindParams(query);
  const sortParams = getSortParams(query);
  logger.debug(
    `Searching games with search params ${JSON.stringify(searchParams)}`
  );
  return new Promise((resolve, reject) => {
    gamesSchema
      .find(searchParams)
      .sort(sortParams) // TODO: remove this hardcoded sort
      .then(result => {
        logger.debug(`Returning ${result.length} results`);
        resolve(result);
      })
      .catch(err => reject(err));
  });
};

module.exports = { find };
