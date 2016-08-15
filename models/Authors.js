var mongoose = require('mongoose');

var AuthorSchema = new mongoose.Schema({
    name: String,
    born: Date,
    died: Date,
    biography: String,
    wikiLink: String,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

mongoose.model('Author', AuthorSchema);
