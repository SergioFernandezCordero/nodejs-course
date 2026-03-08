const db = require("../db/queries");

async function getAllBooks(req, res) {
    const books = await db.getAllBooks();
    if (books.length <= 0 ) {
        const log = "Books inventory is empty";
        console.log(log);
        return log;
    } else {
        console.log("[Controller] getAllBooks successful");
        console.log(books);
        return books;
    }
}

module.exports = {
    getAllBooks
};
