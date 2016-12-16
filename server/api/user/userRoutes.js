var express = require('express');
var app = express();
var router = require('express').Router();
var mongoose = require('mongoose');
var UserSchema = require('./userModel');
// setup boilerplate route jsut to satisfy a request
// for building

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

// GET ALL
router.route('/').get(function(req, res){
    UserSchema.find(function(err, users) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,users);
      }
    });
});
// POST a User
router.route('/').post(function(req, res){
    var newUser = {};
    console.log("Received: ", req.body)
    
    newUser.username = String(req.body.username);
    newUser.address = String(req.body.address);
    
      var newUserSchema = new UserSchema({
        username: newUser.username
      , address: newUser.address
      });

      newUserSchema.save(function(err, newUser) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,newUser);
      }
      });
});
// GET a User
router.route('/:user_id').get(function(req, res){
    console.log("Received: ", req.params.user_id);
    UserSchema.findById(req.params.user_id,function(err, users) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,users);
      }
    });
});

// UPDATE a User
router.route('/:user_id').put(function(req, res){
  console.log("Received: ", req.params.user_id);
    var newUser = {};
    newUser.username = String(req.body.username);
    newUser.address = String(req.body.address);
    
      var obj ={
        username: newUser.username
      , address: newUser.address
      };

    UserSchema.update({ _id:req.params.user_id},obj,function(err, updateUser) {
      if (err){ 
        res.send(500);
        return console.error(err);
      }else{
        res.send(200,updateUser);
      }
    });
});

// DELETE a User
router.route('/:user_id').delete(function(req, res){
    UserSchema.findByIdAndRemove(req.params.user_id, function(err, newUser) {
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
