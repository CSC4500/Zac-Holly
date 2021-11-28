const ttController = require("../controller/appController.js");

module.exports = (app) => {
  // Root Endpoint
  app.route("/").get(ttController.presentHome);

  // Position Endpoints
  app.route("/positions").get(ttController.getAllPositions);
  app.route("/positions/:id(\\d+)").get(ttController.getOnePosition);

  // Team Endpoints
  app.route("/teams").get(ttController.getAllTeams);
  app.route("/teams/:id(\\d+)").get(ttController.getOneTeam);

  // Player Endpoints
  app.route("/players").get(ttController.getAllPlayers);
  app.route("/players/:id(\\d+)").get(ttController.getOnePlayer);

  // Hero Endpoints
  app.route("/heroes").get(ttController.getAllHeroes);
  app.route("/heroes/:id(\\d+)").get(ttController.getOneHero);

  // Top Hero Combination Endpoints
  app.route("/top-heroes").get(ttController.getAllTopHeroCombinations);
  app.route("/top-heroes/:id(\\d+)").get(ttController.getOneTopHeroCombination);

  // Series Endpoints
  app.route("/series").get(ttController.getAllSeries);
  app.route("/series/:id(\\d+)").get(ttController.getOneSeries);

  // Match Endpoints
  app.route("/matches").get(ttController.getAllMatches);
  app.route("/matches/:id(\\d+)").get(ttController.getOneMatch);

  // Competing Team Endpoints
  app.route("/competing-teams").get(ttController.getAllCompetingTeams);
  app.route("/competing-teams/:id(\\d+)").get(ttController.getOneCompetingTeam);
};
