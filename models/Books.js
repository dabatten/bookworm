var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    ISBN: String
});

mongoose.model('Book', BookSchema);
