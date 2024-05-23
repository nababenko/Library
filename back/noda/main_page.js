const db = require("./db");
const express = require('express');
const path = require('path');

const mainRouter = express();


mainRouter.use(express.static(path.join(__dirname, '..', '..')));
mainRouter.use(express.static(path.join(__dirname, '..', '..', 'front')));
mainRouter.use(express.static(path.join(__dirname, '..', '..', 'front', 'main_page')));

mainRouter.get("/", (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'front', 'main_page', 'index.html');
    res.sendFile(filepath);
});


mainRouter.get("/main_scroller", (req, res) => {
       const query = 'SELECT * FROM book LIMIT 10';
        db.query(query, (err, rows) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const books = rows.map(row => ({
                id: row.ID,
                name: row.name,
                cover: row.cover

            }));

            res.json({ books });
        });

});

mainRouter.get("/last", (req, res) => {

    const query = `
        SELECT
            book.ID AS ID,
            book.name AS Name,
            authors.author_name AS Author,
            authors.author_id AS id,
            book.description AS Description,
            book.cover AS Cover
        FROM
            book
                INNER JOIN
            authors
            ON
                book.author = authors.author_id        
        ORDER BY
            book.ID DESC
            LIMIT 1;
    `;

    db.query(query, (err, rows) => {
        if(err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (rows.length > 0) {
            const data = {
                Author: rows[0].Author,
                id: rows[0].id,
                ID: rows[0].ID,
                Name: rows[0].Name,
                Description: rows[0].Description,
                Cover: rows[0].Cover
            };
            res.json(data);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    });
});

module.exports = mainRouter;