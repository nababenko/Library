
const db = require("./db");
const express = require('express');
const path = require('path');

const authorRouter = express();


authorRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));

authorRouter.use(express.static(path.join(__dirname, '..', '..')));
authorRouter.use(express.static(path.join(__dirname,'..', '..', 'front')));
authorRouter.use(express.static(path.join(__dirname,'..', '..', 'front', 'author_page')));

authorRouter.get("/:id", (req, res) => {
    const filepath = path.join(__dirname,'..', '..', 'front','author_page', 'index.html');
    res.sendFile(filepath);
});

authorRouter.get("/data/:id", (req, res) => {
    const id = req.params.id;

    const query = `
        SELECT
            authors.author_name AS Author,
            authors.author_date AS ADate,
            authors.author_bio AS Bio,
            authors.author_country AS Country,
            authors.author_image AS Image,
            book.name AS Name,
            book.date AS Year,
            book.ID AS ID
        FROM
            authors
            LEFT JOIN
            book
        ON
            authors.author_id = book.author
        WHERE
            authors.author_id = ?
    `;

    db.query(query, [id], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (rows.length > 0) {
            const data = {
                Author: rows[0].Author,
                ADate: rows[0].ADate,
                Bio: rows[0].Bio,
                Country: rows[0].Country,
                Image: rows[0].Image,
                Books: []
            };

            rows.forEach(row => {
                if (row.Name) {
                    const book = {
                        Name: row.Name,
                        Year: row.Year,
                        ID: row.ID
                    };
                    data.Books.push(book);
                }
            });

            res.json(data);
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    });
});

module.exports = authorRouter;
