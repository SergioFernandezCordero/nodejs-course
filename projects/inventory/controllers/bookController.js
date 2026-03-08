const db = require("../db/queries");

async function getAllBooks() {
    const books = await db.getAllBooks();
    if (books.length <= 0 ) {
        const log = "[Controller] getAllBooks books inventory is empty";
        console.log(log);
        return log;
    } else {
        console.log("[Controller] getAllBooks successful");
        return books;
    }
}

async function searchByTitle(title) {
    const books = await db.searchByTitle(title);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByTitle no books with this title";
        console.log(log);
    } else {
        console.log("[Controller] searchByTitle successful");
        return books;
    }
}

async function searchByAuthor(author) {
    const books = await db.searchByAuthor(author);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByTitle no books with this title";
        console.log(log);
    } else {
        console.log("[Controller] searchByTitle successful");
        return books;
    }
}

async function searchByGenre(genre) {
    const books = await db.searchByGenre(genre);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByGenre no books in this genre";
        console.log(log);
    } else {
        console.log("[Controller] searchByGenre successful");
        return books;
    }
}

async function searchByPrizeRange(min, max) {
    const books = await db.searchByPrizeRange(min, max);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByPrizeRange no books in this range";
        console.log(log);
    } else {
        console.log("[Controller] searchByPrizeRange successful");
        return books;
    }
}

async function searchByPublishDateRange(min, max) {
    const books = await db.searchByPublishDateRange(min, max);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByPublishDateRange no books in this time range";
        console.log(log);
    } else {
        console.log("[Controller] searchByPublishDateRange successful");
        return books;
    }
}

module.exports = {
    getAllBooks,
    searchByTitle,
    searchByAuthor,
    searchByGenre,
    searchByPrizeRange,
    searchByPublishDateRange
};
