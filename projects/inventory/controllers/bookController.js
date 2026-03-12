const db = require("../db/queries");

async function insertAuthor(fullname, birthDate, country) {
    await db.insertAuthor(fullname, birthDate, country)
        .then(() => {
            const log = `[Controller] SUCCESS - insertAuthor inserted the registry`;
            console.log(log);
        })
        .catch((err) => {
            const log = `[Controller] ERROR - insertAuthor returned ${err}`;
            console.log(log);
            throw new Error(err);
        });
}

async function getAllBooks() {
    const books = await db.getAllBooks();
    if (books.length <= 0 ) {
        const log = "[Controller] getAllBooks books inventory is empty";
        console.log(log);
        return log;
    } else {
        console.log(`[Controller] SUCCESS - getAllBooks returned ${books.length} rows.`);
        return books;
    }
}

async function getAllAuthors() {
    const authors = await db.getAllAuthors();
    if (authors.length <= 0 ) {
        const log = "[Controller] getAllAuthors authors inventory is empty";
        console.log(log);
        return log;
    } else {
        console.log(`[Controller] SUCCESS - getAllAuthors returned ${authors.length} rows.`);
        return authors;
    }
}

async function getAllGenres() {
    const genres = await db.getAllGenres();
    if (genres.length <= 0 ) {
        const log = "[Controller] getAllGenres genres inventory is empty";
        console.log(log);
        return log;
    } else {
        console.log(`[Controller] SUCCESS - getAllGenres returned ${genres.length} rows.`);
        return genres;
    }
}

async function searchByTitle(title) {
    const books = await db.searchByTitle(title);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByTitle no books with this title";
        console.log(log);
    } else {
        console.log(`[Controller] SUCCESS - searchByTitle returned ${books.length} rows.`);
        return books;
    }
}

async function searchByAuthor(author) {
    const books = await db.searchByAuthor(author);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByAuthor no books with this title";
        console.log(log);
    } else {
        console.log(`[Controller] SUCCESS - searchByAuthor returned ${books.length} rows.`);
        return books;
    }
}

async function searchByGenre(genre) {
    const books = await db.searchByGenre(genre);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByGenre no books in this genre";
        console.log(log);
    } else {
        console.log(`[Controller] SUCCESS - searchByGenre returned ${books.length} rows.`);
        return books;
    }
}

async function searchByPrizeRange(min, max) {
    const books = await db.searchByPrizeRange(min, max);
    if (books.length <= 0 ) {
        const log = "[Controller] searchByPrizeRange no books in this range";
        console.log(log);
    } else {
        console.log(`[Controller] SUCCESS - searchByPrizeRange returned ${books.length} rows.`);
        return books;
    }
}

async function searchByPublishDateRange(min, max) {
    const books = await db.searchByPublishDateRange(min, max);
    if (books.length <= 0 ) {
        const log = `[Controller] searchByPublishDateRange no books in this time range`;
        console.log(log);
    } else {
        console.log(`[Controller] SUCCESS - searchByPublishDateRange returned ${books.length} rows.`);
        return books;
    }
}

module.exports = {
    insertAuthor,
    getAllBooks,
    getAllAuthors,
    getAllGenres,
    searchByTitle,
    searchByAuthor,
    searchByGenre,
    searchByPrizeRange,
    searchByPublishDateRange
};
