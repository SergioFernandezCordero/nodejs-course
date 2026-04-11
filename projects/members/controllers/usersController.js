const db = require("../db/queries");
const crypto = require('../lib/crypto-tools');
const { body, validationResult, matchedData } = require("express-validator");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
    body("username").trim()
        .isEmail().withMessage("Username must be an email")
        .notEmpty().withMessage("Username cannot be empty"),
    body("password").trim()
        .isLength({ min: 8, max: 16 }).withMessage(`Password ${lengthErr}`)
        .notEmpty().withMessage("Password is mandatory"),
    body("firstname").trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .notEmpty().withMessage("First Name cannot be empty"),
    body("lastname").trim()
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
        .notEmpty().withMessage("Last name cannot be empty")
]

const createUser = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Data invalid");
            res.status(400).send("Data Invalid");
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
                res.status(500).send("Oops! Something whent wrong")
            }
        }
    }
]

module.exports = {
    createUser
};
