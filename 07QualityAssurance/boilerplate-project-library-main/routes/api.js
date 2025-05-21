/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Books = require("../db/bookSchema");

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        let books = await Books.find({});
        if (!books || books.length == 0) {
          res.status(200).json("no books exists");
          return;
        }
        let bookArray = books.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        }));
        res.status(200).json(bookArray);
      } catch(err) {
        console.log(err);
      }
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.status(200).json("missing required field title");
        return;
      }
      try {
        let book = await Books.create({title: title});
        if (!book) {
          res.status(200).json("Could not create book");
          return;
        }
        res.status(200).json(book);
      } catch(err) {
        console.log(err);
      }
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      try {
        let deletedBooks = await Books.deleteMany({});
        if (!deletedBooks) {
          res.status(200).json("could not delete books");
          return
        }
        res.status(200).json("complete delete successful")
      } catch (err) {
        console.log(err);
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        let book = await Books.findById(bookid);
        if (!book) {
          res.status(200).json("no book exists");
          return;
        }
        res.status(200).json(book);
      } catch (err) {
        console.log(err);
      }
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!bookid) {
        res.status(200).json("missing required field id");
        return;
      }
      if (!comment) {
        res.status(200).json("missing required field comment");
        return;
      }
      try {
        let book = await Books.findById(bookid);
        if (!book) {
          res.status(200).json("no book exists");
          return;
        }
        let newComments = book.comments.concat(comment);
        book.comments = newComments;
        let newBook = await book.save();
        if (!newBook) {
          res.status(200).json("could not update book");
          return;
        }
        res.status(200).json({
          _id: newBook._id,
          title: newBook.title,
          comments: newBook.comments
        });
      } catch (err) {
        console.log(err);
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      if (!bookid) { 
        res.status(200).json("missing required field id");
        return;
      }
      try {
        let book = await Books.findByIdAndDelete(bookid);
        if (!book) {
          res.status(200).json("no book exists");
          return;
        }
        res.status(200).json("delete successful");
      } catch (err) {
        console.log(err);
      }
    });
  
};
