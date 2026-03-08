const pool = require("./pool");


async function insertBook(title, author, publishDate, price, genre) {
    await pool.query("INSERT INTO book (title, author, publishDate, price, genre) VALUES ($1,$2,$3,$4,$5)", [title, author, publishDate, price, genre]);
}

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");
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

async function updateBookAuthor(author) {
    console.log("WIP");
}

async function updateBookTitle(title) {
    console.log("WIP");
}

async function updateBookPrize(prize) {
    console.log("WIP");
}

async function updateBookGenre(genre) {
    console.log("WIP");
}

async function updateBookPublishDate(publishDate) {
    console.log("WIP");
}

async function deleteBookByTitle(title) {
    await pool.query("DELETE FROM books WHERE title = $1", [title]);
}

async function deleteBookByAuthor(author) {
    await pool.query("DELETE FROM books WHERE author = $1", [author]);
}

module.exports = {
    insertBook,
    getAllBooks,
    searchByTitle,
    searchByAuthor,
    searchByGenre,
    searchByPrizeRange,
    searchByPublishDateRange,
    updateBookAuthor,
    updateBookTitle,
    updateBookPrize,
    updateBookGenre,
    updateBookPublishDate,
    deleteBookByTitle,
    deleteBookByAuthor
};
