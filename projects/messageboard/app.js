const express = require('express');
const path = require("node:path");
const app = express();
const PORT = process.env.EXPRESS_PORT || 4001;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
    res.render("form", {title: "Submit a message to Mini Messageboard!"});
});

app.post("/details", (req, res) => {
    res.render("details", {title: "Message details", text: req.body.messageText, user: req.body.messageUser, added: req.body.messageAdded });
});

app.post("/new", (req, res) => {
    messages.push({ text: req.body.messageText, user: req.body.messageUser, added: new Date() });
    res.redirect("/");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error)=>{
    if (error) {
        throw error;
    }
    console.log(`Express running on port ${PORT}! Choo Choo!`);
})
