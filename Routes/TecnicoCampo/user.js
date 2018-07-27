var express = require("express"),
router = express.Router(); //{mergeParams: true}
var express = require('express');
var jwt = require('jsonwebtoken');

var Intervento = require('../../models/Intervento');
var User = require('../../models/User');
var Ticket = require('../../models/Ticket');
var OnlineAdmin = require('../../models/OnlineAdmin');
var Conversation = require('../../models/Conversation');

router.post("/ticket", (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var role = checkRole(token);
        if (role = "user"){
            Ticket.create(req.body.ticket, function(err, data){
                if(err) {
                  console.log(err);
                } else {
                 // console.log(data);
                }
            });
        } else {
          res.status(401).send({success: false, msg: 'Unauthorized.'});
        }
    } else {
      res.status(401).send({success: false, msg: 'Unauthorized.'});
    }

});

router.get('/interventi', function(req,res){
    var token = getToken(req.headers);
    var id =  checkUserID(token);
    if (token) {
        var role = checkRole(token);
        if (role = "user"){
                User.findById(id, function(err, data){
                if (err) { console.log(err)}
                else {
                  var interventi = data.interventi;
                  Intervento.find({'_id': interventi}, function(err, data){
                      if (err) {
                        console.log(err);
                      } else {
                        res.status(200).json(data);
                      }
                  });
                }});
        } else {
          res.status(401).send({success: false, msg: 'Unauthorized.'});
        }
    } else {
      res.status(401).send({success: false, msg: 'Unauthorized.'});
    }

});

router.get('/conversations', function(req, res){
  try {
        console.log('get conversation')

        console.log(req.headers);
        var token = getToken(req.headers);
        var id =  checkUserID(token);
        if (token) {
            var role = checkRole(token);
            if (role = "user"){
                    User.findById(id, function(err, data){
                    if (err) { console.log(err)}
                    else {
                      console.log('data' + data);
                      var conversations = data.conversations;
                      Conversation.find({'_id':  conversations} , function(err, data){
                          if (err) {
                            console.log(err);
                          } else {
                            res.status(200).json(data);
                          }
                      });
                    }});
            } else {
              res.status(401).send({success: false, msg: 'Unauthorized.'});
            }
        } else {
          res.status(401).send({success: false, msg: 'Unauthorized.'});
        }
  } catch(e) {
       console.log('errore in get Conversation' + e);
  }
});

router.get('/onlineAdmin', function(req, res){
    console.log('get online admin api');
    OnlineAdmin.find(function(err, data){
        if(err) {
          console.log(err);
          return;
        }
        res.json(data);
    })
});


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

checkRole = function(token) {
  const decoded = jwt.decode(token , {complete: true});
  const role = decoded.payload.role;
  return role;
}

checkUserID = function(token) {
  try {
    const decoded = jwt.decode(token , {complete: true});
    const id = decoded.payload._id;
    return id;
  } catch (e){
    console.log('errore in check user id');
    console.log(e);
  }

}

module.exports = router;
