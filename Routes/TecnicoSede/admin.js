var express = require("express"),
router = express.Router(); //{mergeParams: true}
var express = require('express');
var jwt = require('jsonwebtoken');

var Intervento = require('../../models/Intervento');
var Conversation = require('../../models/Conversation');

router.get("/interventi", function(req,res){
         var token = getToken(req.headers);
        // res.json(decoded.payload);
        //  console.log('ROLE= ' + decoded.payload.role);
        if (token) {
            var role = checkRole(token);
            if(role == 'admin'){
                  Intervento.find(function(err, data){
                    if (err) { console.log(err)}
                    else {
                      res.json(data);
                    }});
            } else {
              return res.status(403).send({success: false, msg: 'Unauthorized.'});
            }
          } else {
              return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
});

router.get('/conversations', function(req,res){
  Conversation.find(function(err, data){
    if (err) { console.log(err)}
    else {
      console.log('get conversation');
      console.log(data);
      res.json(data);
    }});
});

router.post("/intervento", function(req, res) {
        var token = getToken(req.headers);

        // var x = req.body.tecniciSede.;
        // console.log("tecnici sede " + x);


        var interventoData = new Intervento({   title: req.body.intervento.title,
                                                description: req.body.intervento.description,
                                                duration: req.body.intervento.duration,
                                                date: req.body.intervento.date,
                                                videoURL: req.body.videoURL,
                                                chatId: req.body.chatId,
                                                tecniciSede: req.body.tecniciSede,
                                                tecniciCampo: req.body.tecniciCampo
                                            });

        if (token) {

              var role = checkRole(token);
              if (role == "admin") {
                        Intervento.create(interventoData ,function(err, created){
                          if (err) {
                            return res.json({success: false, msg: err});
                          } else {
                            console.log(created);
                            res.json({success: true, msg: 'Successful created new intervento.'});
                          }
                        });
            } else {
                    return res.status(403).send({success: false, msg: 'Unauthorized.'});
                }}
        else {
            console.log('err')
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
          }

});

router.delete("/intervento", function(req,res){
          var token = getToken(req.headers);
          var interventoID = req.body.interventoID;

          if (token) {

            var role = checkRole(token);
            if (role == "admin") {
                Intervento.findByIdAndRemove(interventoID, (err, callback) => {
                  if(err) {
                    console.log(err);
                    return res.status(500).send(err);
                  }
                  console.log(callback);
                  return res.status(200).send(callback);
                })}
           else {
                  return res.status(403).send({success: false, msg: 'Unauthorized.'});
              }}
      else {
          return res.status(403).send({success: false, msg: 'Unauthorized.'});
        }
});

router.put("/intervento", function(req,res){
            var token = getToken(req.headers);
            var interventoID = req.body.interventoID;

            if (token) {
                  var role = checkRole(token);
                  if (role == "admin") {
                      Intervento.findByIdAndUpdate(interventoID, req.body, {new: true}, (err, callback) => {
                        if(err) {
                              console.log(err);
                              return res.status(500).send(err);
                        }
                        console.log(callback);
                        return res.status(200).send(callback);
                      });
                }
                else {
                      return res.status(403).send({success: false, msg: 'Unauthorized.'});
                }}
          else {
            return res.status(403).send({success: false, msg: 'Unauthorized.'});
          }
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

module.exports = router;
