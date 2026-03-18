const { Pool } = require("pg");

// All of the following properties should be read from environment variables
module.exports = new Pool({
  host: process.env.DBHOST || "localhost",
  user: process.env.DBUSERNAME || "database",
  database: process.env.DBNAME || "inventory",
  password: process.env.DBPASSWORD || "password",
  port: process.env.DBPORT || 5432
});
