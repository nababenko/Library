const express = require('express');
const path = require('path');

const validationRouter = express.Router();


validationRouter.use(express.urlencoded({ extended: true }));


validationRouter.use(express.static(path.join(__dirname, '..', '..')));
validationRouter.use(express.static(path.join(__dirname, '..', '..', 'front')));
validationRouter.use(express.static(path.join(__dirname, '..', '..', 'front', 'admin_validation')));


validationRouter.get("/", (req, res) => {
    const filepath = path.join(__dirname, '..', '..', 'front', 'admin_validation', 'index.html');
    res.sendFile(filepath);
});


validationRouter.post('/', (req, res) => {
    const password = req.body.password;

    if (password === 'libraryProjectAdmin') {
        res.json({ success: true, redirectUrl: '/admin' });
    } else {
        res.json({ success: false, message: 'Invalid password.' });
    }
});

module.exports = validationRouter;