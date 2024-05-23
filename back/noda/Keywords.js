const db = require("./db");
const express = require('express');
const path = require('path');

const keywordsRouter = express();


keywordsRouter.use(express.static(path.join(__dirname, '..', '..')));
keywordsRouter.use(express.static(path.join(__dirname, '..', '..', 'front')));
keywordsRouter.use(express.static(path.join(__dirname, '..', '..', 'front', 'Keywords')));

keywordsRouter.get("/", (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'front', 'Keywords', 'index.html');
    res.sendFile(filepath);
});


keywordsRouter.get("/keyword_lst", (req, res) => {
    const query = 'SELECT DISTINCT keyword FROM book';
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const keyword = rows.map(row => row.keyword);
        res.json(keyword);
    });
});


keywordsRouter.get("/books_by_keyword/:keyword", (req, res) => {
    const keyword = req.params.keyword;
    const query = 'SELECT * FROM book WHERE keyword = ?';
    db.query(query, [keyword], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(rows);
    });
});

module.exports = keywordsRouter;