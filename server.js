
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const db = require('./db/index');

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/question/:id', db.getQuestion);
app.get('/questions/', db.getAllQestions);

app.listen(port);
console.log('Server started');
