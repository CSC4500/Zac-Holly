const ttController = require("../controller/appController.js");

module.exports = (app) => {
  // Root Endpoint
  app.route("/").get(ttController.presentHome);

  // Position Endpoints
  app.route("/positions").get(ttController.getAllPositions);

  app.route("/positions/:id(\\d+)").get(ttController.getOnePosition);

  // Player Endpoints
  app.route("/players").get(ttController.getAllPlayers);

  app.route("/player/:id(\\d+)").get(ttController.getOnePlayer);
};
