// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters.";
const numberErr = "must be a number.";
const emptyErr = "cannot be empty";
const lengthErr = "must be between 1 and 10 characters.";
const ageErr = "must be between 18 and 120 years.";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`)
    .notEmpty().withMessage(`First name ${emptyErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`)
    .notEmpty().withMessage(`Last name ${emptyErr}`),
  body("email").trim()
    .isEmail().withMessage(`Email ${alphaErr}`)
    .notEmpty().withMessage(`Email ${emptyErr}`),
  body("age").trim()
    .optional({ values: 'falsy'})
    .isNumeric().withMessage(`Age ${numberErr}`)
    .isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`)
];

exports.usersListGet = (req, res) => {
  res.render("index2", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, age, email } = matchedData(req);
    usersStorage.addUser({ firstName, lastName, age, email });
    res.redirect("/");
  }
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, age, email } = matchedData(req);
    usersStorage.updateUser(req.params.id, { firstName, lastName, age, email });
    res.redirect("/");
  }
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};
