const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function searchUsername(username) {
    const { rows } = await pool.query("SELECT * FROM usernames where username = ($1)", [username]);
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function deleteUsernames() {
    await pool.query("DELETE FROM usernames");
}

module.exports = {
    getAllUsernames,
    searchUsername,
    insertUsername,
    deleteUsernames
};
