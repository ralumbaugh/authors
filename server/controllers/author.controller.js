const { Author } = require('../models/author.model');

module.exports.createAuthor = (request, response) =>{
    console.log(request.body)
    const { name } = request.body;
    Author.create({
        name
    })
        .then(author => response.json(author))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllAuthors = (request, response) => {
    Author.find({})
        .then(authors => response.json(authors))
        .catch(err => response.json(err))
}

module.exports.showSingleAuthor = (request, response) => {
    Author.findOne({_id: request.params.id})
        .then(author => response.json(author))
        .catch(err => response.json(err))
}

module.exports.updateAuthor = (request, response) =>{ 
    Author.findOneAndUpdate({_id:request.params.id}, request.body, { runValidators:true, new: true })
        .then(updatedAuthor => response.json(updatedAuthor))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteAuthor = (request, response) => {
    Author.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.createQuote = (request,response) => {
    Author.findOneAndUpdate({_id:request.params.id}, {$push: {quotes: request.body}}, { runValidators:true })
        .then(newQuote => response.json({success: true}))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteQuote = (request,response) => {
    Author.findByIdAndUpdate(request.params.authorid, {$pull: {quotes: {_id: request.params.quoteid}}})
        .then(deletedQuote => {
            response.json({success:true})
        })
        .catch(err => response.json(err))
}