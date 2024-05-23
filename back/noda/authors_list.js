
const express = require('express');
const db = require('./db');
const path = require('path');

const authorsRouter = express.Router();

authorsRouter.use(express.static(path.join(__dirname, '..', '..')));
authorsRouter.use(express.static(path.join(__dirname, '..', '..', 'front')));
authorsRouter.use(express.static(path.join(__dirname, '..', '..', 'front', 'Authors')));

authorsRouter.get("/", (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'front', 'Authors', 'index.html');
    res.sendFile(filepath);
});

authorsRouter.get("/authors-list", (req, res) => {
    const query = 'SELECT * FROM authors';
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        const authors = rows.map(row => ({
            id: row.author_id,
            name: row.author_name,
            description: row.author_bio
        }));

        res.json({ authors });
    });
});

module.exports = authorsRouter;
