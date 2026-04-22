const path = require("node:path");
const { initiatizeRedisSessionStorage } = require("./lib/redis-store.js")
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
//const query = require("./controllers/messageController");
const users = require("./controllers/usersController");
const PORT = process.env.EXPRESS_PORT || 4001;
const sessionSecrets = process.env.SESSION_SECRETS.split(" ") || "unsecure";
const app = express();

// Iniatilize passport authentication

passport.serializeUser((id, done) => {
  console.log("[Auth] Serializing user.")
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("[Auth] Deserializing user.")
    const user = await users.loginDataByID(id)
    done(null, id);
  } catch(err) {
    console.log(`[Auth] Error deserializing user: ${err}`);
    done(null, err);
  }
});

passport.use(
  new LocalStrategy(users.loginUser)
);

// Initialize app
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

// initialize passport package
app.use(passport.initialize());
// initialize a session with passport that authenticates the sessions from express-session
app.use(passport.session());

app.get("/", (req, res) => {
    res.render("index");
});
app.route("/sign-up")
    .get((req, res) => {
        res.render("signup")
    })
    .post(users.createUser);

app.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post(passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
    })
  );

app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})
