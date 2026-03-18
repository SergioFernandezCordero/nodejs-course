const db = require("../db/queries");

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
    try {
        await db.insertGenre(genre)
        const log = `[Controller] SUCCESS - insertGenre inserted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - insertGenre returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function insertBook(title, author, publishDate, price, genre) {
    try {
        await db.insertBook(title, author, publishDate, price, genre);
        const log = `[Controller] SUCCESS - insertBook inserted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - insertBook returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function getAllBooks() {
    try {
        const books = await db.getAllBooks();
        if (books.length <= 0 ) {
            const log = "[Controller] getAllBooks books inventory is empty";
            console.log(log);
            return log;
        } else {
            console.log(`[Controller] SUCCESS - getAllBooks returned ${books.length} rows.`);
            return books;
        }
    } catch (err) {
        const log = `[Controller] ERROR - getAllBooks returned ${err}`;
        console.log(log);
        throw new Error(err);
    }

}

async function getAllAuthors() {
    try {
        const authors = await db.getAllAuthors();
        if (authors.length <= 0 ) {
            const log = "[Controller] getAllAuthors authors inventory is empty";
            console.log(log);
            return log;
        } else {
            console.log(`[Controller] SUCCESS - getAllAuthors returned ${authors.length} rows.`);
            return authors;
        }
    } catch (err) {
        const log = `[Controller] ERROR - getAllAuthors returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function getAllGenres() {
    try {
        const genres = await db.getAllGenres();
        if (genres.length <= 0 ) {
            const log = "[Controller] getAllGenres genres inventory is empty";
            console.log(log);
            return log;
        } else {
            console.log(`[Controller] SUCCESS - getAllGenres returned ${genres.length} rows.`);
            return genres;
        }
    } catch (err) {
        const log = `[Controller] ERROR - getAllGenres returned ${err}`;
        console.log(log);
        throw new Error(err);
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

async function updateBook(title, author, publishDate, price, genre) {
    try {
        await db.updateBook(title, author, publishDate, price, genre);
        const books = await searchByTitle(title);
        const log = `[Controller] SUCCESS - updateBook inserted the registry`;
        console.log(log);
        return books;
    } catch (err) {
        const log = `[Controller] ERROR - updateBook returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function updateAuthor(fullname, birthDate, country) {
    try {
        const insert = await db.updateAuthor(fullname, birthDate, country);
        const log = `[Controller] SUCCESS - updateAuthor inserted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - updateAuthor returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function updateGenre(genre) {
    try {
        await db.updateGenre(genre)
        const log = `[Controller] SUCCESS - updateGenre inserted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - updateGenre returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}


async function deleteBook(title) {
    try {
        const action = await db.deleteBook(title);
        const log = `[Controller] SUCCESS - deleteBook deleted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - deleteBook returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function deleteAuthor(fullname) {
    try {
        const action = await db.deleteAuthor(fullname);
        const log = `[Controller] SUCCESS - deleteAuthor deleted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - deleteAuthor returned ${err}`;
        console.log(log);
        throw new Error(err);
    }
}

async function deleteGenre(genre) {
    try {
        const action = await db.deleteGenre(genre)
        const log = `[Controller] SUCCESS - deleteGenre deleted the registry`;
        console.log(log);
    } catch (err) {
        const log = `[Controller] ERROR - deleteGenre returned ${err}`;
        console.log(log);
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
    searchByPublishDateRange,
    updateBook,
    updateAuthor,
    updateGenre,
    deleteBook,
    deleteAuthor,
    deleteGenre
};
