const db = require("../db/queries");

// TODO: Change all to try/catch convention
async function insertAuthor(fullname, birthDate, country) {
    try {
        const insert = await db.insertAuthor(fullname, birthDate, country);
        const log = `[Controller] SUCCESS - insertAuthor inserted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - insertAuthor returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function insertGenre(genre) {
    await db.insertGenre(genre)
        .then(() => {
            const log = `[Controller] SUCCESS - insertGenre inserted the registry`;
            console.log(log);
        })
        .catch((err) => {
            const log = `[Controller] ERROR - insertGenre returned ${err}`;
            console.log(log);
        });
}

async function insertBook(title, author, publishDate, price, genre) {
    await db.insertBook(title, author, publishDate, price, genre)
        .then(() => {
            const log = `[Controller] SUCCESS - insertBook inserted the registry`;
            console.log(log);
        })
        .catch((err) => {
            const log = `[Controller] ERROR - insertBook returned ${err}`;
            console.log(log);
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
    try {
        const books = await db.searchByTitle(title)
        if (typeof books == 'undefined' || books.length <= 0 ) {
            const log = "[Controller] searchByTitle no books with this title";
            console.log(log);
            return books;
        } else {
            console.log(`[Controller] SUCCESS - searchByTitle returned ${books.length} rows.`);
            return books;
        }
    } catch (err) {
        const log = `[Controller] ERROR - searchByTitle returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function searchByAuthor(author) {
    try {
        const books = await db.searchByAuthor(author)
        if (typeof books == 'undefined' || books.length <= 0 ) {
            const log = "[Controller] searchByAuthor no books with this title";
            return books;
        } else {
            console.log(`[Controller] SUCCESS - searchByAuthor returned ${books.length} rows.`);
            return books;
        }
    } catch (err) {
        const log = `[Controller] ERROR - searchByAuthor returned ${err}`;
        throw new Error(err);
    }
}

async function searchByGenre(genre) {
    try {
        const books = await db.searchByGenre(genre)
        if (typeof books == 'undefined' || books.length <= 0 ) {
            const log = "[Controller] searchByGenre no books with this title";
            return books;
        } else {
            console.log(`[Controller] SUCCESS - searchByGenre returned ${books.length} rows.`);
            return books;
        }
    } catch (err) {
        const log = `[Controller] ERROR - searchByGenre returned ${err}`;
        throw new Error(err);
    }
}

async function searchByPrizeRange(min, max) {
    try {
        const books = await db.searchByPrizeRange(min, max);
        if (books.length <= 0 ) {
            const log = "[Controller] searchByPrizeRange no books in this range";
            console.log(log);
        } else {
            console.log(`[Controller] SUCCESS - searchByPrizeRange returned ${books.length} rows.`);
            return books;
        }
    } catch (err) {
        const log = `[Controller] ERROR - searchByPrizeRange returned ${err}`;
        throw new Error(err);
    }
}

async function searchByPublishDateRange(min, max) {
    try {
        const books = await db.searchByPublishDateRange(min, max);
        if (books.length <= 0 ) {
            const log = `[Controller] searchByPublishDateRange no books in this time range`;
            console.log(log);
        } else {
            console.log(`[Controller] SUCCESS - searchByPublishDateRange returned ${books.length} rows.`);
            return books;
        }
    } catch (err) {
        const log = `[Controller] ERROR - searchByPublishDateRange returned ${err}`;
        throw new Error(err);
    }
}

module.exports = {
    insertAuthor,
    insertGenre,
    insertBook,
    getAllBooks,
    getAllAuthors,
    getAllGenres,
    searchByTitle,
    searchByAuthor,
    searchByGenre,
    searchByPrizeRange,
    searchByPublishDateRange
};
