const db = require("../db/queries");
const crypto = require('../lib/crypto-tools');
const { body, validationResult, matchedData } = require("express-validator");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
    body("username").trim()
        .notEmpty().withMessage("Username cannot be empty")
        .isEmail().withMessage("Username must be an email"),
    body("password").trim()
        .notEmpty().withMessage("Password cannot be empty")
        .isLength({ min: 4, max: 16 }).withMessage(`Password ${lengthErr}`),
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

module.exports = {
    createUser
};
