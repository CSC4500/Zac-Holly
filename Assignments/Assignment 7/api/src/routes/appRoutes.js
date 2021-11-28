const ttController = require("../controller/appController.js");

module.exports = (app) => {
  // Root Endpoint
  app.route("/").get(ttController.presentHome);

  // Player Endpoints
  app.route("/players").get(ttController.getAllPlayers);

  app.route("/player/:id(\\d+)").get(ttController.getOnePlayer);
};
