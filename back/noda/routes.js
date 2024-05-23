const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const listRouter = require('./book_list');
const bookRouter = require('./book_page');
const genresRouter = require('./Genres');
const keywordsRouter = require('./Keywords');
const alistRouter = require('./authors_list');
const authorRouter = require('./author_page');
const searchRouter = require('./search');
const mainRouter = require('./main_page');
const validationRouter = require('./admin_validation');
const adminRouter = require('./admin');
const admin2Router = require('./admin2');


router.use(express.static(path.join(__dirname, '..', '..', 'front')));
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.use('/books_list', listRouter);
router.use('/book_page', bookRouter);
router.use('/genres', genresRouter);
router.use('/keywords', keywordsRouter);
router.use('/authors', alistRouter);
router.use('/author_page', authorRouter);
router.use('/main', mainRouter);
router.use('/admin_validation', validationRouter);
router.use('/admin', adminRouter);
router.use('/admin2', admin2Router);
router.use('/', searchRouter);


module.exports = router;