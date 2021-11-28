const { Player } = require("../model/appModel.js");

// Removes undefined values from an object
const removeUndefinedValues = (obj) => {
  for (const key of Object.keys(obj))
    if (obj[key] === undefined) delete obj[key];
  return obj;
};

// Parses address queries
const queryParser = (query, objConstructor) => {
  let objFilter;
  let objPaginate = {
    error: false,
    limit: query.limit,
    offset: query.offset,
  };
  let objSort = [];
  let objBetween;

  if (Object.keys(query).length !== 0) {
    if (
      objPaginate.limit !== undefined &&
      (isNaN(objPaginate.limit) || objPaginate.limit <= 0)
    ) {
      objPaginate.error = true;
      objPaginate.errMsg = `Not Acceptable. Error near 'limit' and '${objPaginate.limit}'`;
      return [null, objPaginate];
    }
    if (
      objPaginate.offset !== undefined &&
      (isNaN(objPaginate.offset) || objPaginate.offset < 0)
    ) {
      objPaginate.error = true;
      objPaginate.errMsg = `Not Acceptable. Error near 'offset' and '${objPaginate.offset}'`;
      return [null, objPaginate];
    }

    if (query.sort !== undefined) {
      for (const value of query.sort.split(",")) {
        const [col, order] = value.split(":");
        let validCol = objConstructor({ [col]: "" });

        validCol = Object.keys(validCol)[0];
        if (validCol === undefined) continue;
        objSort.push({
          column: validCol,
          order: order === undefined ? "asc" : order,
        });
      }
    }

    if (query.between !== undefined) {
      const [col, between] = query.between.split(/:(.+)/);
      let validCol = objConstructor({ [col]: "" });

      query.between.split(":").splice().join;

      console.log(between);

      validCol = Object.keys(validCol)[0];
      if (validCol !== undefined) {
        const [start, end] = between.split(/@(.+)/);
        if (start.startsWith("start=") && end.startsWith("end=")) {
          objBetween = {
            column: validCol,
            start: start.split(/=(.+)/)[1],
            end: end.split(/=(.+)/)[1],
          };
        }
      }
    }

    objFilter = objConstructor(query);
  }

  console.log(objBetween);

  return [objFilter, objPaginate, objSort, objBetween];
};

// Root Controller Function
exports.presentHome = (req, res) => {
  res.send("<h1>REST API for TangoTwo Database</h1>");
};

// Player Controller Functions
exports.getAllPlayers = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return removeUndefinedValues(new Player(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Player.getAll(filter, paginate, sort, between, (err, users) => {
    if (err) res.status(500).send(err);
    else res.send(users);
  });
};

exports.getOnePlayer = (req, res) => {
  Player.getOne(req.params.id, (err, player) => {
    if (err) res.status(500).send(err);
    else if (player.length <= 0) res.sendStatus(404);
    else res.send(player);
  });
};
