var express = require('express');
var app = express();
var router = require('express').Router();
var mongoose = require('mongoose');
var PostSchema = require('./postModel');
var router = require('express').Router();


// setup boilerplate route jsut to satisfy a request
// for building

// GET ALL
router.route('/').get(function(req, res){
    PostSchema.find(function(err, posts) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,posts);
      }
    });
});
// POST a POST
router.route('/').post(function(req, res){
    var newPost = {};
    console.log("Received: ", req.body)

    newPost.title = String(req.body.title);
    newPost.text = String(req.body.text);
    newPost.author = String(req.body.author);
    newPost.categories = String(req.body.categories);

      var newPostSchema = new PostSchema({
        title: newPost.title
      , text: newPost.text
      , author: newPost.author
      , categories: newPost.categories
      });

      newPostSchema.save(function(err, newPost) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,newPost);
      }
      });
});
// GET a Post
router.route('/:post_id').get(function(req, res){
    PostSchema.findById(req.params.post_id,function(err, posts) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,posts);
      }
    });
});
// UPDATE a Post
router.route('/:post_id').put(function(req, res){
    var newPost = {};
    newPost.title = String(req.body.title);
    newPost.text = String(req.body.text);
    newPost.author = String(req.body.author);
    newPost.categories = String(req.body.categories);
    
      var obj ={
        title: newPost.title
      , text: newPost.text
      , author: newPost.author
      , categories: newPost.categories
      };

    PostSchema.update({ _id:req.params.post_id},obj,function(err, updatePost) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,updatePost);
      }
    });
});
// DELETE a Post
router.route('/:post_id').delete(function(req, res){
    PostSchema.findByIdAndRemove(req.params.post_id, function(err, newPost) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200);
      }
    });
});
//Error Handeling
app.use('/',router);

app.use(function(err,req,res,next) {
  console.log(err.stack);
  res.status(500).send({"Error" : err.stack});
});
module.exports = router;
