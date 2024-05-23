const db = require("./db");
const express = require('express');
const path = require('path');

const bookRouter = express();


bookRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));

bookRouter.use(express.static(path.join(__dirname, '..', '..')));
bookRouter.use(express.static(path.join(__dirname,'..', '..', 'front')));
bookRouter.use(express.static(path.join(__dirname,'..', '..', 'front', 'book_page')));

bookRouter.get("/:id", (req, res) => {
    const filepath = path.join(__dirname,'..', '..', 'front','book_page', 'index.html');
    res.sendFile(filepath);
});

bookRouter.get("/data/:id", (req, res) => {
    const id = req.params.id;

    const query = `
        SELECT 
            book.name AS Name, 
            authors.author_name AS Author,
            authors.author_id AS id,
            book.genre AS Genre, 
            book.description AS Description, 
            book.date AS Date,  
            book.paragraph AS Paragraph, 
            book.cover AS Cover 
        FROM 
            book 
        INNER JOIN 
            authors 
        ON 
            book.author = authors.author_id 
        WHERE 
            book.ID = ?
    `;

    db.query(query, [id], (err, rows) => {
        if(err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (rows.length > 0) {
            const data = {
                Date: rows[0].Date,
                Author: rows[0].Author,
                id: rows[0].id,
                Name: rows[0].Name,
                Genre: rows[0].Genre,
                Description: rows[0].Description,
                Paragraph: rows[0].Paragraph,
                Cover: rows[0].Cover
            };
            res.json(data);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    });
});
module.exports = bookRouter;