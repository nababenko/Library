const db = require("./db");
const express = require('express');
const path = require('path');

const genresRouter = express();


genresRouter.use(express.static(path.join(__dirname, '..', '..')));
genresRouter.use(express.static(path.join(__dirname, '..', '..', 'front')));
genresRouter.use(express.static(path.join(__dirname, '..', '..', 'front', 'Genres')));

genresRouter.get("/", (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'front', 'Genres', 'index.html');
    res.sendFile(filepath);
});


genresRouter.get("/genre_lst", (req, res) => {
    const query = 'SELECT DISTINCT genre FROM book';
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const genres = rows.map(row => row.genre);
        res.json(genres);
    });
});


genresRouter.get("/books_by_genre/:genre", (req, res) => {
    const genre = req.params.genre;
    const query = 'SELECT * FROM book WHERE genre = ?';
    db.query(query, [genre], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(rows);
    });
});

module.exports = genresRouter;