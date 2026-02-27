const express = require('express');
const path = require("node:path");
const app = express();
const authorRouter = require("./routes/authorRouter.js");
const booksRouter = require("./routes/booksRouter.js");
const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];
const users = ["Rose", "Cake", "Biff"];
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { links: links, users: users });
});

app.get("/about", (req, res) => {
    res.render("about", { links: links });
});

app.get('/cocido', (req,res) => {
    res.send('Marchando un cocido!');
})

app.get('/:userName/messages/:messageId', (req,res) =>{
    console.log(req.params);
    res.end();
})

app.get('/querable', (req,res) =>{
    console.log(req.query['nombre']);
    res.end();
})

app.use('/authors', authorRouter);
app.use('/books', booksRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.EXPRESS_PORT || 4001;
app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})
