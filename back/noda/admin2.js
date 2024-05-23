const db = require("./db");
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require("fs");

const admin2Router = express();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


admin2Router.use(express.static(path.join(__dirname, '..', '..')));
admin2Router.use(express.static(path.join(__dirname,'..', '..', 'front')));
admin2Router.use(express.static(path.join(__dirname,'..', '..', 'front', 'admin_page')));

admin2Router.get("/", (req, res) => {
    const filepath = path.join(__dirname,'..', '..', 'front','admin_page', 'index.html');
    res.sendFile(filepath);
});


admin2Router.post("/author", upload.single('photo'), (req, res) => {
    const { name, date, country, bio } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const photo = req.file.buffer;
    const filePath = `./uploads/${req.file.originalname}`;

    fs.writeFile(filePath, photo, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'File could not be saved' });
        }

        const imageUrl = `http://localhost:3000/${filePath}`;

        db.query('INSERT INTO authors (author_name, author_date, author_country, author_bio, author_image) VALUES (?,?,?,?,?)',
            [name, date, country, bio, imageUrl],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(200).json({ message: 'Data inserted successfully' });
            }
        );
    });
});
admin2Router.get('/data', (req, res) => {
    let sql = 'SELECT * FROM authors';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

admin2Router.get('/data/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM authors WHERE author_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch data' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Data not found' });
            return;
        }
        res.json(result[0]);
    });
});

admin2Router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    let sql = 'UPDATE authors SET ? WHERE author_id = ?';
    db.query(sql, [newData, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Data updated successfully');
    });
});

admin2Router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM authors WHERE author_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Data deleted successfully');
    });
});


module.exports = admin2Router;