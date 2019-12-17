var db = require('./db');

exports.getAllAuthors = function(cb){
    db.query('select * from lmsdb.author', function(err, result) {
        cb(err, result);
      });
};

exports.addAuthor = function(author, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('insert into lmsdb.author (author_name) values (?)', [author.author_name], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
};

exports.updateAuthor = function(author, cb){
db.beginTransaction(function(err){
    if(err) cb(err, null);

    db.query('update lmsdb.author set author_name = ? where author_id = ?', [author.author_name, author.author_id], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      } 
      db.commit(function(err, res){
        cb(err, res);
      });
    });
  });
};

exports.removeAuthor = function(authorId, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('delete from lmsdb.author where author_id = ?', [authorId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
}