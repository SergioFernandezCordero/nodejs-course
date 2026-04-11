const pool = require("./pool");

async function createNewUser(username, password, firstname, lastname) {
    await pool.query("INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)", [username, password, firstname, lastname]);
}
async function getAllMessages() {
    //await XXX;
}

async function publishMessage() {
    //await XXX;
}

module.exports = {
    createNewUser,
    getAllMessages,
    publishMessage
};
