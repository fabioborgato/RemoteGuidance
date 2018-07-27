var express = require("express"),
router = express.Router(); //{mergeParams: true}
var passport = require("passport");
var config = require('../config/database');
var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

// MODEL
var User = require("../models/User");
var Admin = require("../models/Admin");

// ROUTES ADMIN

router.post("/admin/login",
  passport.authenticate('admin', { session: false }) ,
    function(req, res) {
      var x = req.user.toJSON();
      x.role = "admin";
      var token = jwt.sign(x, config.secret, {expiresIn: '1d'});
      // const decoded = jwt.decode(token , {complete: true});
      // res.json(decoded.payload);
      res.json({success: true, token:'JWT ' + token});
    });


router.post("/admin/register", function(req, res){

  var newAdmin = new Admin({
          username : req.body.username,
          email: req.body.email,
          photoURL: req.body.photoURL
      });

  Admin.register(newAdmin, req.body.password, function(err, admin){
      if (err) {
          console.log(err);
          return res.redirect("/auth/admin/register")
      }
      else {
          passport.authenticate('admin')(req, res, function(){
                res.json({success: true, msg: 'Successful created new user.'});
          });
      }
  });

});


router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// ROUTES USER

router.post("/user/login",
passport.authenticate('user', { session: false }) ,
function(req, res) {
      var x = req.user.toJSON();
      x.role = "user";
      var token = jwt.sign(x, config.secret, {expiresIn: '1d'});
      res.json({success: true, token:'JWT ' + token});
  });



router.post("/user/register", function(req,res){

          var newUser = new User({ username : req.body.username, email: req.body.email});

          User.register(newUser, req.body.password, function(err, user){
              if (err) {
                  console.log(err);
                  return res.send("error");
              }
              else {
                  passport.authenticate('user')(req, res, function(){
                          var x = req.user.toJSON();
                          x.role = "user";
                          var token = jwt.sign(x, config.secret, {expiresIn: '1d'});
                          res.json({success: true, token:'JWT ' + token, userID: x._id});
                  });
              }
          });
      });

router.post("/user/completeRegistration/:id", function(req,res){
      console.log("id = " + req.params.id);

       User.findById(req.params.id, function(err, user){
            if (err) {
                console.log(err);
                return res.status(401).send({success: false, msg: 'Failed.'});
            } else {
                console.log(user);
                user.phone = req.body.phone;
                user.company = req.body.company;
                user.save();
                var x = req.user.toJSON();
                x.role = "user";
                var token = jwt.sign(x, config.secret, {expiresIn: '1d'});
                return res.json({success: true, message: 'Updated user phone and company', token:'JWT ' + token});
            }
      })
});

router.post("/user/uploadPhoto/:id", function(req, res){

  User.findById(req.params.id, function(err, user){
    if (err) {
        console.log(err);
        return res.status(401).send({success: false, msg: 'Failed.'});
    } else {
        user.photoURL = req.body.photoURL;
        user.save();
        return res.json({success: true, message: 'Updated photo'});
    }
})
})

module.exports = router;
