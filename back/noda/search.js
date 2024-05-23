const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/search', (req, res) => {

    const searchTerm = req.body.searchTerm;
    const query = `
        SELECT book.name AS book_name, authors.author_name AS author_name, book.ID
        FROM book
        JOIN authors ON book.author = authors.author_id
        WHERE book.name LIKE ? OR authors.author_name LIKE ?
    `;
    const likeTerm = `%${searchTerm}%`;

    db.query(query, [likeTerm, likeTerm], (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

module.exports = router;