var routes = require('express').Router();
var db = require('../dao/db');
var bookDao = require('../dao/bookDao');
var authorDao = require('../dao/authorDao');

routes.get('/book',function(req,res){
    bookDao.getAllBooks(function(error, result){
      let ret = [];
      if(error) throw error;
      authorDao.getAllAuthors()
      .then(function(authors){
        for(let i = 0; i < result.length; i++) {
          for(let j = 0; j < result.length; j++) {
            if(result[i].author_id == authors[j].author_id) {
              var tmp = {
                book_id : result[i].book_id,
                title : result[i].title,
                author_name : authors[j].author_name
              }
              ret.push(tmp);
            }
          }
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(ret);
      })
      .catch(function(err){
        throw err;
      });
    });
});

routes.post('/book', function(req, res){
  var book = req.body;
  bookDao.addBook(book, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Book Failed!');
    }
    res.status(201);
    res.send('Add Book Successful!');
  });

});

routes.put('/book', function(req, res){
  var book = req.body;
  bookDao.updateBook(book, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Book Failed!');
    }
    res.status(201);
    res.send('Update Book Successful!');
  });

});

routes.delete('/book/:id', function(req, res){
  bookDao.removeBook(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Book Failed!');
    }
    res.send('Delete Book Successful!');
  });
});

module.exports = routes;
