const gamesSchema = require("../models/gamesSchema");
const logger = require("../logger/logger");
const httpError = require("../errors/httpError");

const sortableColumns = {
  id: "Id",
  release: "Year_of_Release",
  critic_score: "Critic_Score",
  user_score: "User_Score"
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
    order = order && sortableColumnsOrder.hasOwnProperty(order) ? order : "asc";

    if (sortableColumns.hasOwnProperty(column)) {
      Object.defineProperty(sort, sortableColumns[column], {
        enumerable: true,
        value: sortableColumnsOrder[order]
      });
    } else {
      throw new httpError(400, `Column '${column}' is not sortable`);
    }
  }
  return sort;
};

const getPaginationParams = params => {
  const skip = params.skip ? parseInt(params.skip) : 0;
  const limit = params.limit ? parseInt(params.limit) : 1000;

  return { skip, limit };
};

const find = query => {
  const searchParams = validateAndGetFindParams(query);
  logger.debug(`Searching games with params ${JSON.stringify(searchParams)}`);
  const sortParams = getSortParams(query);
  logger.debug(`Sorting games with params ${JSON.stringify(sortParams)}`);
  const paginationParams = getPaginationParams(query);
  logger.debug(`Paginating with params ${JSON.stringify(paginationParams)}`);

  return new Promise((resolve, reject) => {
    gamesSchema
      .find(searchParams)
      .sort(sortParams)
      .skip(paginationParams.skip)
      .limit(paginationParams.limit)
      .then(result => {
        logger.debug(`Returning ${result.length} results`);
        resolve(result);
      })
      .catch(err => reject(err));
  });
};

module.exports = { find };
