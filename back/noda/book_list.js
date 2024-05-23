
const db = require("./db");
const express = require('express');
const path = require('path');

const listRouter = express();

listRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));

listRouter.use(express.static(path.join(__dirname, '..', '..')));
listRouter.use(express.static(path.join(__dirname, '..', '..', 'front')));
listRouter.use(express.static(path.join(__dirname, '..', '..', 'front', 'books_list')));

listRouter.get("/", (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'front', 'books_list', 'index.html');
    res.sendFile(filepath);
});

listRouter.get("/books", (req, res) => {
    const query = 'SELECT * FROM book';
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const books = rows.map(row => ({
            id: row.ID,
            name: row.name,
            cover: row.cover,
            date: row.date,
            description: row.description
        }));

        res.json({ books });
    });
});

module.exports = listRouter;

