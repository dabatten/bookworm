var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Author = mongoose.model('Author');
var Book = mongoose.model('Book');

//--------Params-----------


router.param('author', function (req, res, next, id) {
    var query = Author.findById(id);

    query.exec(function (err, author) {
        if (err) {
            return next(err);
        }
        if (!author) {
            return next(new Error('can\'t find author'));
        }

        req.author = author;
        return next();
    });
});

router.param('book', function (req, res, next, id) {
    var query = Book.findById(id);

    query.exec(function (err, book) {
        if (err) {
            return next(err);
        }
        if (!book) {
            return next(new Error('can\'t find book'));
        }

        req.book = book;
        return next();
    });
});


//-------Routes-----------

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Bookworm'
    });
});

router.get('/authors', function (req, res, next) {
    Author.find(function (err, authors) {
        if (err) {
            return next(err);
        }
        res.render('authors/authors', {
            authors: authors
        });
    })
});

router.get('/authors/:author', function (req, res, next) {
    res.render('authors/author', {
        author: req.author
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
        res.render('books/books', {
            books: books
        });
    }).populate('author')
});

router.get('/books/:book', function (req, res, next) {
    req.book.populate('author', function (err, book) {
        if (err) {
            return next(err);
        }

        res.render('books/book', {
            book: book
        });
    });
});

module.exports = router;
