const express = require('express');
var bodyParser = require('body-parser');
const path = require("node:path");
const query = require("./controllers/bookController");
const PORT = process.env.EXPRESS_PORT || 4001;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    try {
        const books = await query.getAllBooks()
        res.render("books", { books: books });
    } catch (err) {
        console.log(`[Router] catched ${err}`);
        res.render("books", { by: "book", error: err }); 
    }
});

app.get("/authors", async(req, res) => {
    try {
        const authors = await query.getAllAuthors();
        res.render("authors", { authors: authors });
    } catch (err) {
        console.log(`[Router] catched ${err}`);
        res.render("authors", { error: err }); 
    }
});

app.get("/genres", async(req, res) => {
    try {
        const genres = await query.getAllGenres();
        res.render("genres", { by: "genre", genres: genres });
    } catch (err) {
        console.log(`[Router] catched ${err}`);
        res.render("genres", { by: "genre", error: err }); 
    }
});

app.route('/new/author')
    .get((req, res) => {
    res.render("creator", { by: "author" });
    })
    .post(async(req, res) => {
        try {
            const insertAuthor = await query.insertAuthor(req.body.fullname, req.body.birthdate, req.body.country)
            const date = new Date(req.body.birthdate);
            res.render("authors", { by: "author", authors: [{ 
                fullname: req.body.fullname,
                birthdate: date,
                country: req.body.country
            }], query: `${req.body.title}` }); 
        } catch(err) {
            console.log(`[Router] catched ${err}`);
            res.render("authors", { by: "author", error: err, query: `${req.body.title}` }); 
        }

    })

app.route('/new/genre')
    .get((req, res) => {
    res.render("creator", { by: "genre" });
    })
    .post(async(req, res) => {
        try {
            const newGenre = await query.insertGenre(req.body.genre)
            res.render("genres", { by: "genre", genres: [{ genre: req.body.genre }] }); 
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("genres", { by: "genre", error: err }); 
        }

    })

app.route('/new/book')
    .get((req, res) => {
    res.render("creator", { by: "book" });
    })
    .post(async (req, res) => {
        try {
            const date = new Date(req.body.publishDate);
            const insertBook = await query.insertBook(req.body.title, req.body.author, req.body.publishDate, req.body.price, req.body.genre)
            res.render("books", { by: "book", books: [{
                title: req.body.title,
                author: req.body.author,
                publishDate: date,
                price: req.body.price,
                genre: req.body.genre
            }] }); 
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("books", { by: "book", error: err }); 
        }

    })

app.route('/search/bytitle')
    .get((req, res) => {
    res.render("searcher", { by: "title" });
    })
    .post(async (req, res) => {
        try {
            const byTitle = await query.searchByTitle(req.body.title)
            res.render("books", { by: "title", books: byTitle }); 
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("books", { by: "book", error: err }); 
        }
    })

app.route('/search/byauthor')
    .get((req, res) => {
    res.render("searcher", { by: "author" });
    })
    .post(async(req, res) => {
        try {
            const byAuthor = await query.searchByAuthor(req.body.author)
            res.render("books", { by: "author", books: byAuthor });
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("books", { by: "author", error: err }); 
        }
    })

app.route('/search/bygenre')
    .get((req, res) => {
    res.render("searcher", { by: "genre" });
    })
    .post(async(req, res) => {
        try {
            const byGenre = await query.searchByGenre(req.body.genre)
            res.render("books", { by: "genre", books: byGenre });
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("books", { by: "genre", error: err }); 
        }
    })

app.route('/search/byprice')
    .get((req, res) => {
    res.render("searcher", { by: "price" });
    })
    .post(async(req, res) => {
        try {
            const byGenre = await query.searchByPrizeRange(req.body.min, req.body.max)
            res.render("books", { by: "price", books: byGenre, query:`between ${req.body.min} and ${req.body.max}`}); 
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("books", { by: "book", error: err }); 
        }
    })

app.route('/search/bypublishdate')
    .get((req, res) => {
    res.render("searcher", { by: "publish date" });
    })
    .post(async(req, res) => {
        try {
            const byPublishDate = await query.searchByPublishDateRange(req.body.min, req.body.max)
            res.render("books", { by: "publish date", books: byPublishDate, query:`between ${req.body.min} and ${req.body.max}`}); 
        } catch (err) {
            console.log(`[Router] catched ${err}`);
            res.render("books", { by: "book", error: err }); 
        }
    })

app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})