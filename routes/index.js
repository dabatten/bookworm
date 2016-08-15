var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Book = mongoose.model('Book');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Bookworm'
    });
});

router.get('/books', function (req, res, next) {
    Book.find(function (err, books) {
        if (err) {
            return next(err);
        }
        if (!books) {
            return next(new Error('No books found!'));
        }
        res.render('books', {
            books: books
        });
    })
});

module.exports = router;
