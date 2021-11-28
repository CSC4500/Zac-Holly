const {
  Position,
  Team,
  Player,
  Hero,
  TopHero,
  Series,
  Match,
} = require("../model/appModel.js");

// Removes undefined values from an object and prepend given table name to existing columns
const reformatConstructorOutput = (obj, tableName) => {
  for (const key of Object.keys(obj))
    if (obj[key] === undefined) delete obj[key];
    else if (tableName) {
      Object.defineProperty(
        obj,
        tableName + "." + key,
        Object.getOwnPropertyDescriptor(obj, key)
      );
      delete obj[key];
    }
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

    console.log(objFilter);
  }

  return [objFilter, objPaginate, objSort, objBetween];
};

// Root Controller Function
exports.presentHome = (req, res) => {
  res.send("<h1>REST API for TangoTwo Database</h1>");
};

// Position Controller Functions
exports.getAllPositions = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return reformatConstructorOutput(new Position(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Position.getAll(filter, paginate, sort, between, (err, positions) => {
    if (err) res.status(500).send(err);
    else res.send(positions);
  });
};

exports.getOnePosition = (req, res) => {
  Position.getOne(req.params.id, (err, position) => {
    if (err) res.status(500).send(err);
    else if (position.length <= 0) res.sendStatus(404);
    else res.send(position);
  });
};

// Team Controller Functions
exports.getAllTeams = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return reformatConstructorOutput(new Team(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Team.getAll(filter, paginate, sort, between, (err, teams) => {
    if (err) res.status(500).send(err);
    else res.send(teams);
  });
};

exports.getOneTeam = (req, res) => {
  Team.getOne(req.params.id, (err, team) => {
    if (err) res.status(500).send(err);
    else if (team.length <= 0) res.sendStatus(404);
    else res.send(team);
  });
};

// Player Controller Functions
exports.getAllPlayers = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return reformatConstructorOutput(new Player(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Player.getAll(filter, paginate, sort, between, (err, players) => {
    if (err) res.status(500).send(err);
    else res.send(players);
  });
};

exports.getOnePlayer = (req, res) => {
  Player.getOne(req.params.id, (err, player) => {
    if (err) res.status(500).send(err);
    else if (player.length <= 0) res.sendStatus(404);
    else res.send(player);
  });
};

// Hero Controller Functions
exports.getAllHeroes = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return reformatConstructorOutput(new Hero(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Hero.getAll(filter, paginate, sort, between, (err, heroes) => {
    if (err) res.status(500).send(err);
    else res.send(heroes);
  });
};

exports.getOneHero = (req, res) => {
  Hero.getOne(req.params.id, (err, hero) => {
    if (err) res.status(500).send(err);
    else if (hero.length <= 0) res.sendStatus(404);
    else res.send(hero);
  });
};

// Top Hero Combination Controller Functions
exports.getAllTopHeroCombinations = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return {
      ...reformatConstructorOutput(new TopHero(query), "DOTA_TOP_HERO"),
      ...reformatConstructorOutput(new Hero(query), "DOTA_HERO"),
      ...reformatConstructorOutput(new Player(query), "DOTA_PLAYER"),
    };
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  TopHero.getAll(filter, paginate, sort, between, (err, topHeroes) => {
    if (err) res.status(500).send(err);
    else res.send(topHeroes);
  });
};

exports.getOneTopHeroCombination = (req, res) => {
  TopHero.getOne(req.params.id, (err, topHero) => {
    if (err) res.status(500).send(err);
    else if (topHero.length <= 0) res.sendStatus(404);
    else res.send(topHero);
  });
};

// Series Controller Functions
exports.getAllSeries = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return reformatConstructorOutput(new Series(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Series.getAll(filter, paginate, sort, between, (err, series) => {
    if (err) res.status(500).send(err);
    else res.send(series);
  });
};

exports.getOneSeries = (req, res) => {
  Series.getOne(req.params.id, (err, series) => {
    if (err) res.status(500).send(err);
    else if (series.length <= 0) res.sendStatus(404);
    else res.send(series);
  });
};

// Match Controller Functions
exports.getAllMatches = (req, res) => {
  const [filter, paginate, sort, between] = queryParser(req.query, (query) => {
    return reformatConstructorOutput(new Match(query));
  });

  if (paginate.error) {
    res.status(406).send(paginate.errMsg);
    return;
  }

  Match.getAll(filter, paginate, sort, between, (err, matches) => {
    if (err) res.status(500).send(err);
    else res.send(matches);
  });
};

exports.getOneMatch = (req, res) => {
  Match.getOne(req.params.id, (err, match) => {
    if (err) res.status(500).send(err);
    else if (match.length <= 0) res.sendStatus(404);
    else res.send(match);
  });
};
