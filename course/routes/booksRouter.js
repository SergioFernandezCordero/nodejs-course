// routes/authorRouter.js
const { Router } = require("express");

const booksRouter = Router();

booksRouter.get("/", (req, res) => res.send("All books"));

booksRouter.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  res.send(`Book ID: ${bookId}`);
});

booksRouter.get("/:bookId/reserve", (req, res) =>{
  const { bookId } = req.params;
  res.send(`Book ID: ${bookId} is reserved`);
})

booksRouter.post("/:bookId/reserve", (req, res) =>{
  const { bookId } = req.params;
  const reservationId = Math.random(9999) * 10000;
  res.send(`Book ID: ${bookId} reserve ${reservationId} confirmed.`);
})

module.exports = booksRouter;
