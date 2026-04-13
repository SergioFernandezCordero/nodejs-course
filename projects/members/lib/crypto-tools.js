const bcrypt = require("bcryptjs");

async function hashPassword(rawPassword) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);
        return hashedPassword
    } catch(err){
        console.log("ERROR - Something went wrong hashing the password")
        throw Error(err)
    }
}

async function comparePasswords(insertedPassword, storedPassword) {
    try {
        const match = await bcrypt.compare(insertedPassword, storedPassword);
        return match;
    } catch(err) {
        console.log(`ERROR - Cannot validate password: ${err}`);
        throw Error(err);
    }
}

module.exports = {
    hashPassword,
    comparePasswords
}