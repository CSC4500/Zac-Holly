const { knex } = require("./db.js");

const Position = function (position) {
  this.DOTA_POS_ID = position.positionId;
  this.DOTA_POS_NAME = position.positionName;
};

const Team = function (team) {
  this.DOTA_TEAM_ID = team.teamId;
  this.DOTA_TEAM_NAME = team.teamName;
  this.DOTA_TEAM_REGION = team.teamRegion;
  this.DOTA_TEAM_EARNINGS = team.teamEarnings;
};

const Player = function (player) {
  this.DOTA_PLAYER_ID = player.playerId;
  this.DOTA_PLAYER_HANDLE = player.playerHandle;
  this.DOTA_PLAYER_FNAME = player.playerFirstName;
  this.DOTA_PLAYER_LNAME = player.playerLastName;
  this.DOTA_PLAYER_COUNTRY = player.playerCountry;
  this.DOTA_PLAYER_IS_CAPTAIN = player.playerIsCaptain;
  this.DOTA_PLAYER_IS_COACH = player.playerIsCoach;
  this.DOTA_PLAYER_EARNINGS = player.playerEarnings;
  this.DOTA_POS_ID = player.positionId;
  this.DOTA_TEAM_ID = player.teamId;
};

const Hero = function (hero) {
  this.DOTA_HERO_ID = hero.heroId;
  this.DOTA_HERO_NAME = hero.heroName;
  this.DOTA_HERO_ATTR = hero.heroAttribute;
};

// Position Model Functions
Position.getAll = (filter, paginate, sort, between, result) => {
  knex
    .select()
    .from("DOTA_POS")
    .timeout(2000, { cancel: true })
    .modify((queryBuilder) => {
      if (filter !== undefined) queryBuilder.where(filter);
      if (paginate.limit !== undefined) queryBuilder.limit(paginate.limit);
      if (paginate.offset !== undefined) queryBuilder.offset(paginate.offset);
      if (sort.length > 0) queryBuilder.orderBy(sort);
      if (between !== undefined)
        queryBuilder.whereBetween(between.column, [between.start, between.end]);
    })
    .then((data) => {
      console.log("Positions: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

Position.getOne = (id, result) => {
  knex
    .select()
    .from("DOTA_POS")
    .where("DOTA_POS_ID", id)
    .timeout(2000, { cancel: true })
    .then((data) => {
      console.log("Position: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

// Team Model Functions
Team.getAll = (filter, paginate, sort, between, result) => {
  knex
    .select()
    .from("DOTA_TEAM")
    .timeout(2000, { cancel: true })
    .modify((queryBuilder) => {
      if (filter !== undefined) queryBuilder.where(filter);
      if (paginate.limit !== undefined) queryBuilder.limit(paginate.limit);
      if (paginate.offset !== undefined) queryBuilder.offset(paginate.offset);
      if (sort.length > 0) queryBuilder.orderBy(sort);
      if (between !== undefined)
        queryBuilder.whereBetween(between.column, [between.start, between.end]);
    })
    .then((data) => {
      console.log("Teams: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

Team.getOne = (id, result) => {
  knex
    .select()
    .from("DOTA_TEAM")
    .where("DOTA_TEAM_ID", id)
    .timeout(2000, { cancel: true })
    .then((data) => {
      console.log("Team: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

// Player Model Functions
Player.getAll = (filter, paginate, sort, between, result) => {
  knex
    .select()
    .from("DOTA_PLAYER")
    .timeout(2000, { cancel: true })
    .modify((queryBuilder) => {
      if (filter !== undefined) queryBuilder.where(filter);
      if (paginate.limit !== undefined) queryBuilder.limit(paginate.limit);
      if (paginate.offset !== undefined) queryBuilder.offset(paginate.offset);
      if (sort.length > 0) queryBuilder.orderBy(sort);
      if (between !== undefined)
        queryBuilder.whereBetween(between.column, [between.start, between.end]);
    })
    .then((data) => {
      console.log("Players: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

Player.getOne = (id, result) => {
  knex
    .select()
    .from("DOTA_PLAYER")
    .where("DOTA_PLAYER_ID", id)
    .timeout(2000, { cancel: true })
    .then((data) => {
      console.log("Player: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

// Hero Model Functions
Hero.getAll = (filter, paginate, sort, between, result) => {
  knex
    .select()
    .from("DOTA_HERO")
    .timeout(2000, { cancel: true })
    .modify((queryBuilder) => {
      if (filter !== undefined) queryBuilder.where(filter);
      if (paginate.limit !== undefined) queryBuilder.limit(paginate.limit);
      if (paginate.offset !== undefined) queryBuilder.offset(paginate.offset);
      if (sort.length > 0) queryBuilder.orderBy(sort);
      if (between !== undefined)
        queryBuilder.whereBetween(between.column, [between.start, between.end]);
    })
    .then((data) => {
      console.log("Heroes: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

Hero.getOne = (id, result) => {
  knex
    .select()
    .from("DOTA_HERO")
    .where("DOTA_HERO_ID", id)
    .timeout(2000, { cancel: true })
    .then((data) => {
      console.log("Hero: ", data);
      result(null, data);
    })
    .catch((err) => {
      console.log("SQL Error: ", err);
      result(err, null);
    });
};

module.exports = {
  Position: Position,
  Team: Team,
  Player: Player,
  Hero: Hero,
};
