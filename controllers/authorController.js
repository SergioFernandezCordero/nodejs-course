// controllers/authorController.js
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const db = require("../db");

async function getAuthorById(req, res) {
  const { authorId } = req.params;
    const author = await db.getAuthorById(Number(authorId));

    if (!author) {
        throw new CustomNotFoundError("Author not found");
    }
    res.send(`Author Name: ${author.name}`);
};

module.exports = { getAuthorById };
