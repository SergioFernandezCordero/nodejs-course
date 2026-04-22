const pool = require("./pool");

async function createNewUser(username, password, firstname, lastname) {
    await pool.query("INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)", [username, password, firstname, lastname]);
}

async function getLoginData(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const loginData = rows[0];
    return loginData;
}

async function getLoginDataFromId(id) {
    const { rows } = await pool.query("SELECT id, username, firstname, lastname, ismember FROM users WHERE id = $1", [id]);
    const loginDataID = rows[0];
    return loginDataID;
}

async function getAllMessages() {
    //await XXX;
}

async function publishMessage() {
    //await XXX;
}

module.exports = {
    createNewUser,
    getLoginData,
    getLoginDataFromId,
    getAllMessages,
    publishMessage
};
