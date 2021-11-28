const ttController = require("../controller/appController.js");

module.exports = (app) => {
    app.route("/").get(ttController.presentHome);
};
