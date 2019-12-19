var routes = require('express').Router();
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

routes.get('/author', function(req,res){
  authorDao.getAllAuthors()
  .then(function(result){
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  })
  .catch(function(err){
    throw err;
  });
});

routes.post('/author', function(req, res) {
  var author = req.body;
  authorDao.addAuthor(author)
  .then(function(result) {
    res.status(201);
    res.send('Add Author Successful!');
  })
  .catch(function(err){
    res.status(400);
    res.send('Add Author Failed!');
    throw err;
  });
});

routes.put('/author', function(req, res) {
  var author = req.body;
  authorDao.updateAuthor(author)
  .then(function(result) {
    res.status(201);
    res.send('Update Author Successful!');
  })
  .catch(function(err){
    res.status(400);
    res.send('Update Author Failed!');
    throw err;
  });
});


routes.delete('/author/:id', function(req, res){
  authorDao.removeAuthor(req.params.id)
  .then(function(result) {
    res.send('Delete Author Successful!');
  })
  .catch(function(err){
    res.status(400);
    res.send('Delete Author Failed!');
    throw err;
  });
});

module.exports = routes;
