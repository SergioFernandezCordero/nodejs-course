const pool = require("./pool");

async function insertBook(title, author, publishDate, price, genre) {
    await pool.query("INSERT INTO books (title, author, publishDate, price, genre) VALUES ($1,$2,$3,$4,$5)", [title, author, publishDate, price, genre]);
}

async function insertAuthor(fullname, birthDate, country) {
    await pool.query("INSERT INTO authors (fullname, birthdate, country) VALUES ($1,$2,$3)", [fullname, birthDate, country]);
}

async function insertGenre(genre) {
    await pool.query("INSERT INTO genres (genre) VALUES ($1)", [genre]);
}

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows;
}
async function getAllAuthors() {
    const { rows } = await pool.query("SELECT * FROM authors");
    return rows;
}
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function searchByTitle(title) {
    const { rows } = await pool.query("SELECT * FROM books where title = ($1)", [title]);
    return rows;
}

async function searchByAuthor(author) {
    const { rows } = await pool.query("SELECT * FROM books where author LIKE ($1)", [author]);
    return rows;
}

async function searchByGenre(genre) {
    const { rows } = await pool.query("SELECT * FROM books where genre = ($1)", [genre]);
    return rows;
}

async function searchByPrizeRange(min, max) {
    const { rows } = await pool.query("SELECT * FROM books where price >= $1 AND price <=$2", [min, max]);
    return rows;
}

async function searchByPublishDateRange(min, max) {
    const { rows } = await pool.query("SELECT * FROM books WHERE publishDate BETWEEN $1::DATE AND $2::DATE", [min, max]);
    return rows;
}

async function updateAuthor(fullname, birthDate, country) {
    await pool.query("UPDATE authors SET birthdate = $2, country = $3 WHERE fullname = $1", [fullname, birthDate, country]);
}

async function updateBook(title, author, publishDate, price, genre) {
    await pool.query("UPDATE books SET author = $2, publishDate = $3, price = $4, genre = $5 WHERE title = $1", [title, author, publishDate, price, genre]);
}

async function deleteBookByTitle(title) {
    await pool.query("DELETE FROM books WHERE title = $1", [title]);
}

async function deleteBookByAuthor(author) {
    await pool.query("DELETE FROM books WHERE author = $1", [author]);
}

module.exports = {
    insertBook,
    insertAuthor,
    insertGenre,
    getAllBooks,
    getAllAuthors,
    getAllGenres,
    searchByTitle,
    searchByAuthor,
    searchByGenre,
    searchByPrizeRange,
    searchByPublishDateRange,
    updateAuthor,
    updateBook,
    deleteBookByTitle,
    deleteBookByAuthor
};
