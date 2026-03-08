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
            res.render("books", { title: "Book Inventory", books: books });
        })
        .catch((err) => {
            throw new Error(err);
        });
});

app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})