const express = require('express');
const app = express();

app.get('/', (req,res) => {
  console.log(req);
  res.send('Hello World');
})

const PORT = 4001;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Express Server running! Choo chooo!')
})