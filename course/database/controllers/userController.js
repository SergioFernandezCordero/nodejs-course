const db = require("../db/queries");

async function getUsernames(req, res) {
    const usernames = await db.getAllUsernames();
    if (usernames.length <= 0 ) {
        console.log("Username database empty.");
        res.send("Usernames database empty.");
    } else {
        console.log("Usernames: ", usernames);
        res.send("Usernames: " + usernames.map(user => user.username).join(", "));
    }

}

async function searchUsernameGet(req, res) {
    const username = req.query.search;
    const searchUsernames = await db.searchUsername(username);
    const searchUsername = searchUsernames.map(user => user.username);
    if (searchUsername.includes(username)) {
        console.log("Match found for username: " + username);
        res.send("Usernames found: " + searchUsername.join(", "));
    } else {
        res.send("No usernames found by " + username );
    };
}

async function createUsernameGet(req, res) {
    res.render("index", { title: "New users" });
}

async function createUsernamePost(req, res) {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
}

async function deleteUsernamesGet(req, res) {
    await db.deleteUsernames();
    res.redirect("/");
}

module.exports = {
    getUsernames,
    searchUsernameGet,
    createUsernameGet,
    createUsernamePost,
    deleteUsernamesGet
};
