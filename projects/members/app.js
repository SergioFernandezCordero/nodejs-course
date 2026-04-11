const path = require("node:path");
var bodyParser = require('body-parser');
const { Pool } = require("pg");
const { RedisStore } = require("connect-redis")
const { createClient } = require("redis");
const { initiatizeRedisSessionStorage } = require("./lib/redis-store.js")
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const query = require("./controllers/messageController");
const users = require("./controllers/usersController");
const PORT = process.env.EXPRESS_PORT || 4001;
const sessionSecrets = process.env.SESSION_SECRETS.split(" ") || "unsecure";
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Initialize session storage.
const redisStore = initiatizeRedisSessionStorage();
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: sessionSecrets,
  }),
)

app.get("/", (req, res) => {
    res.render("index");
});
app.route("/sign-up")
    .get((req, res) => {
        res.render("signup")
    })
    .post(users.createUser);

app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})
