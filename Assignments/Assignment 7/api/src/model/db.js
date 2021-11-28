const fs = require("fs");

// Retrieve local DB info
const dbInfo = JSON.parse(fs.readFileSync("./authentication/db-info.json"));

// Connect to DB from info
const knex = require("knex")({
  client: "mysql",
  connection: dbInfo,
});

// Test DB connection
knex
  .raw("SELECT 1")
  .timeout(1000)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    knex.destroy();
    console.log("Database connection ERROR");
    throw err;
  });

module.exports = { knex };
