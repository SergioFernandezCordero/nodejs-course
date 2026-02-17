const express = require('express');
const app = express();
const authorRouter = require("./routes/authorRouter.js");
const booksRouter = require("./routes/booksRouter.js");

app.get('/', (req,res)=>{
    res.send('Hello World');
})

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
