var db = require('./db');

exports.getAllAuthors = function(){
  return new Promise(function(resolve, reject){
      db.query('select * from lmsdb.author', function(err, result){            
          return err ? reject(err) : resolve(result);
      });
  });
};

exports.addAuthor = function(author, cb){
  return new Promise(function(resolve, reject){
    db.query('insert into lmsdb.author (author_name) values (?)', [author.author_name], function(err, result){            
        return err ? reject(err) : resolve(result);
    });
  });
};

exports.updateAuthor = function(author, cb){
  return new Promise(function(resolve, reject){
    db.query('update lmsdb.author set author_name = ? where author_id = ?', [author.author_name, author.author_id], function(err, result){            
        return err ? reject(err) : resolve(result);
    });
  });
};

exports.removeAuthor = function(authorId, cb){
  return new Promise(function(resolve, reject){
    db.query('delete from lmsdb.author where author_id = ?', [authorId], function(err, result){            
        return err ? reject(err) : resolve(result);
    });
  });
};
