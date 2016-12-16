var express = require('express');
var app = express();
var router = require('express').Router();
var mongoose = require('mongoose');
var CategorySchema = require('./categoryModel');

// setup boilerplate route jsut to satisfy a request
// for building

// GET ALL
router.route('/').get(function(req, res){
    CategorySchema.find(function(err, categories) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,categories);
      }
    });
});

// Create a category
router.route('/').post(function(req, res){
    var newCategory = {};
    console.log("Received: ", req.body)
    
    newCategory.category = String(req.body.category);
    
      var newCategorySchema = new CategorySchema({
        category: newCategory.category
      });

      newCategorySchema.save(function(err, newCategory) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,newCategory);
      }
      });
});

// GET a Category
router.route('/:category_id').get(function(req, res){
    CategorySchema.findById(req.params.category_id,function(err, categories) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,categories);
      }
    });
});

// UPDATE a Category
router.route('/:category_id').put(function(req, res){
    var newCategory = {};
    newCategory.category = String(req.body.category);
    
      var obj ={
        category: newCategory.category
      };

    CategorySchema.update({ _id:req.params.category_id},obj,function(err, updateCategory) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,updateCategory);
      }
    });
});

// DELETE a Category
router.route('/:category_id').delete(function(req, res){
    CatetorySchema.findByIdAndRemove(req.params.category_id, function(err, newCategory) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200);
      }
    });
});

app.use('/',router);

app.use(function(err,req,res,next) {
  console.log(err.stack);
  res.status(500).send({"Error" : err.stack});
});
module.exports = router;
