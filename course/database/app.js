const express = require('express');
var bodyParser = require('body-parser');
const path = require("node:path");
const { getUsernames, searchUsernameGet, createUsernameGet, createUsernamePost, deleteUsernamesGet } = require("./controllers/userController");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    if ("search" in req.query) {
        const searched = req.query.search;
        console.log("Searching for user: " + searched)
        searchUsernameGet(req, res);
    } else {
        getUsernames(req, res);
    }
});

app.get("/new", (req, res) => {
    createUsernameGet(req, res);
});

app.get("/delete", (req, res) => {
    console.log("All usernames will be deleted");
    deleteUsernamesGet(req,res);
});


app.post("/new", (req, res) => {
    console.log("username to be saved: ", req.body);
    createUsernamePost(req, res);
});

const PORT = process.env.EXPRESS_PORT || 4001;
app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})
