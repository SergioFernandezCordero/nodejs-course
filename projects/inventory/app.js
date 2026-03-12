const express = require('express');
var bodyParser = require('body-parser');
const path = require("node:path");
const query = require("./controllers/bookController");
const PORT = process.env.EXPRESS_PORT || 4001;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    query.getAllBooks()
        .then((books) => {
            res.render("books", { books: books });
        })
        .catch((err) => {
            throw new Error(err);
        });
});

app.get("/authors", (req, res) => {
    query.getAllAuthors()
        .then((authors) => {
            res.render("authors", { authors: authors });
        })
        .catch((err) => {
            throw new Error(err);
        });
});

app.get("/genres", (req, res) => {
    query.getAllGenres()
        .then((genres) => {
            res.render("genres", { genres: genres });
        })
        .catch((err) => {
            throw new Error(err);
        });
});

app.route('/new/author')
    .get((req, res) => {
    res.render("creator", { by: "author" });
    })
    .post((req, res) => {
        query.insertAuthor(req.body.fullname, req.body.birthdate, req.body.country)
        .then(() => {
            const date = new Date(req.body.birthdate);
            res.render("authors", { by: "author", authors: [ { fullname: req.body.fullname, birthdate: date, country: req.body.country }], query: `${req.body.title}` }); 
        })
        .catch((err) => {
            console.log(`[Router] catched ${err}`);
            // TODO Cargar la página authors mostrando el error sin actualizar.
            res.end()
        });

    })


app.route('/search/bytitle')
    .get((req, res) => {
    res.render("searcher", { by: "title" });
    })
    .post((req, res) => {
    query.searchByTitle(req.body.title)
        .then((books) => {
            res.render("books", { by: "title", books: books, query: `${req.body.title}` }); 
        })
        .catch((err) => {
            throw new Error(err);
        });
    })

app.route('/search/byauthor')
    .get((req, res) => {
    res.render("searcher", { by: "author" });
    })
    .post((req, res) => {
    query.searchByAuthor(req.body.author)
        .then((books) => {
            res.render("books", { by: "author", books: books, query:`${req.body.author}`}); 
        })
        .catch((err) => {
            throw new Error(err);
        });
    })

app.route('/search/bygenre')
    .get((req, res) => {
    res.render("searcher", { by: "genre" });
    })
    .post((req, res) => {
    query.searchByGenre(req.body.genre)
        .then((books) => {
            res.render("books", { by: "genre", books: books, query:`${req.body.genre}`}); 
        })
        .catch((err) => {
            throw new Error(err);
        });
    })

app.route('/search/byprice')
    .get((req, res) => {
    res.render("searcher", { by: "price" });
    })
    .post((req, res) => {
    query.searchByPrizeRange(req.body.min, req.body.max)
        .then((books) => {
            res.render("books", { by: "price", books: books, query:`between ${req.body.min} and ${req.body.max}`}); 
        })
        .catch((err) => {
            throw new Error(err);
        });
    })

app.route('/search/bypublishdate')
    .get((req, res) => {
    res.render("searcher", { by: "publish date" });
    })
    .post((req, res) => {
    query.searchByPublishDateRange(req.body.min, req.body.max)
        .then((books) => {
            res.render("books", { by: "publish date", books: books, query:`between ${req.body.min} and ${req.body.max}`}); 
        })
        .catch((err) => {
            throw new Error(err);
        });
    })

app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})