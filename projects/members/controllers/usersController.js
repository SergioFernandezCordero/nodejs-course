const db = require("../db/queries");
const crypto = require('../lib/crypto-tools');
const { body, validationResult, matchedData } = require("express-validator");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 8 and 16 characters.";

const validateUser = [
    body("username").trim()
        .notEmpty().withMessage("Username cannot be empty")
        .isEmail().withMessage("Username must be an email"),
    body("password").trim()
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({ min: 8, max: 16 }).withMessage(`Password ${lengthErr}`)
        .isStrongPassword({ // See https://express-validator.github.io/docs/api/validation-chain#isstrongpassword
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Password must contain at one uppercase character, one lower case and one special character."),
    body("confirmpassword")
        .custom((value, {req}) => {
            return value === req.body.password
        })
        .withMessage("Passwords don't match"),
    body("firstname").trim()
        .notEmpty().withMessage("First Name cannot be empty")
        .isAlpha().withMessage(`First Name ${alphaErr}`),
    body("lastname").trim()
        .notEmpty().withMessage("Last name cannot be empty")
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
]

const createUser = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorValuesRaw = JSON.stringify(errors.array()[0]);
            const errorValues = JSON.parse(errorValuesRaw)
            console.log(`[Controller] ERROR: ${errorValues.msg}`);
            res.status(400).send(`Error: ${errorValues.msg}`);
        } else {
            const { username, password, firstname, lastname } = matchedData(req);
            try {
                const hashedPassword = await crypto.hashPassword(password)
                await db.createNewUser(username, hashedPassword, firstname, lastname);
                const log = `[Controller] SUCCESS - User created successfully`;
                console.log(log);
                res.status(200).send("User created correctly")
            } catch (err) {
                const log = `[Controller] ERROR - User not created: ${err}`;
                console.log(log);
                res.status(500).send("Oops! User cannot be created")
            }
        }
    }
]

async function loginUser(username, password, done) {
    try {
        console.log(`[Controller] requesting login for ${username}`)
        const loginData = await db.getLoginData(username)
        if (!loginData.username) {
            return done(null, false, { message: "Username not found" });
        }
        const match = await crypto.comparePasswords(password, loginData.password)
        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        console.log(`[Controller] login successfull for ${username}`);
        return done(null, username);
    } catch(err) {
        console.log(`[Controller] ERROR: Cannot login ${username}: ${err}`)
    }
}

async function loginDataByID(id) {
    try {
        const loginData = await db.getLoginDataFromId(id);
        console.log(loginData);
        return loginData;
    } catch(err) {
        console.log(err)
    }
}
module.exports = {
    createUser,
    loginUser,
    loginDataByID
};
