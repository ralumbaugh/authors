const AuthorController = require('../controllers/author.controller');
module.exports= function(app){
    app.get('/api/authors', AuthorController.getAllAuthors);
    app.post('/api/author', AuthorController.createAuthor);
    app.patch('/api/quote/:id', AuthorController.createQuote);
    app.get('/api/author/:id', AuthorController.showSingleAuthor);
    app.put('/api/author/:id', AuthorController.updateAuthor);
    app.delete('/api/author/:id', AuthorController.deleteAuthor);
    app.patch('/api/author/:authorid/:quoteid', AuthorController.deleteQuote);
}