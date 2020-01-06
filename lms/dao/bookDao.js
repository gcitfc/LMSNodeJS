var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from lmsdb.book', function(err, result) {
        cb(err, result);
      });
};

exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into lmsdb.book (title, author_id) values(?,?)', [book.title, book.author_id], function(err, res){
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

exports.updateBook = function(book, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('update lmsdb.book set title = ?, author_id = ? where book_id = ?', [book.title, book.author_id, book.book_id], function(err, res){
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

exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
        db.query('delete from lmsdb.book where book_id = ?', [bookId], function(err, res){
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