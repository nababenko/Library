const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(express.static(path.join(__dirname, '..', '..')));
app.use(express.static(path.join(__dirname,'..', '..', 'front')));
app.use(express.static(path.join(__dirname,'..', '..', 'front', 'main_page')));

app.get("/", (req, res) => {
    const filepath = path.join(__dirname,'..', '..', 'front','main_page', 'index.html');
    res.sendFile(filepath);
});

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});