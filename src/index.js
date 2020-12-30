const express = require('express');

const app = express();
const port = 8089;

app.get('/', (req, res) => {
  res.send('Hello Storage!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})