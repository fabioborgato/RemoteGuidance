var app = require('express')(),
    server = require('http').createServer(app);
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    io = require('socket.io')(server);
    morgan = require('morgan');
    localStrategy = require("passport-local");
    var config = require('./config/database');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({'extended':'true'}));

    var User = require("./models/User");
    var Admin = require("./models/Admin");
    var Conversation = require('./models/Conversation');
    var Message = require('./models/Message');
    var OnlineAdmin = require('./models/OnlineAdmin');

    mongoose.Promise = require('bluebird');
    mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

    var userRoutes = require("./Routes/TecnicoCampo/user");
    var authRoutes = require("./Routes/auth");
    var adminRoute = require("./Routes/TecnicoSede/admin");

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE', 'PUT');
        next();
    });

    // passport config
    app.use(require("express-session")({
      secret: "waddafack",
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('user', new localStrategy(User.authenticate()));
    passport.use('admin', new localStrategy(Admin.authenticate()));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    app.use("/auth", authRoutes);
    app.use("/admin", adminRoute);
    app.use("/user", userRoutes);


    // SOCKET IO

    // io.of('/admin').on('connection', function(socket){
    //   console.log('an admin connected ');

    // });

    // CONNECTED USER

    var connectedAdmins = [{
      id: String,
      username: String,
      specializzazione: String,
      photoURL: String
    }];

    io.on('connection', function(socket){

        socket.on('join', function(user){
              console.log('USER JOIN = ');
              console.log(user);
              if (user.role == 'admin') {

                        OnlineAdmin.findOne( {"username" : user.username}, function(err, callback){
                              if(err) {
                                console.log(err);
                                return;
                              }

                              if(callback == null) {
                                    user.socketID = socket.id;
                                    OnlineAdmin.create(user, function(err, call){
                                        if(err) {
                                          console.log(err);
                                          return;
                                        }
                                        OnlineAdmin.find(function(err, data){
                                          if (err) {
                                            console.log(err)
                                          }
                                          socket.broadcast.emit('onlineAdmin', data);
                                      });
                                    });
                              }
                        });
              } else if (user.role == 'user') {
                          OnlineAdmin.find(function(err, data){
                            if (err) {
                              console.log(err)
                            }
                            socket.broadcast.emit('onlineAdmin', data);
                        });
              }

        });

      socket.on('startSupport', function(dataReceived) {
            const partecipants = [];
            partecipants.push(dataReceived.message.username);
            if (dataReceived.idAdmin != '') {
              partecipants.push(dataReceived.idAdmin);
              console.log('idAdmin present in startSupport');
            } else {
              console.log('idAdmin not present in startSupport');
            }

            try {
              Conversation.find({},function(err, conversation){
                let allowed = false;
                if (err) {
                  console.log('errore in start support server');
                  return;
                } else {

                    if(conversation.length > 0) {

                            conversation.forEach(data => {
                              const date = new Date(data.messages[0].date).getTime();
                              const today = new Date().getTime();
                              var difference = today - date;
                              var milliseconds20min = (1000 * 60) * 20;
                              if(milliseconds20min > difference) {
                                      console.log('attendi');
                                      socket.broadcast.emit('waitForSupport');
                                      allowed = false;
                              } else {
                                      console.log('puoi');
                                      allowed = true;
                              }
                              console.log(difference);
                            });

                            if(allowed) {
                                  Conversation.create({partecipants: [partecipants]}, function(err, created){
                                    if (err) {
                                      console.log(err);
                                    } else {
                                          try {
                                              created.messages.push(dataReceived.message);
                                              created.save();
                                              User.findById(dataReceived.idUser, function(err, user){
                                                    if (err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    try {
                                                        user.conversations.push(created._id);
                                                        user.save();
                                                        socket.broadcast.emit('startSupport', created);

                                                    } catch (e){
                                                        console.log('errore in push conversation ' + e);
                                                    }
                                              });
                                          } catch (e) {
                                              console.log('error to insert in user conversation array')
                                              console.log(e);
                                }}});
                            }

                    } else {
                            Conversation.create({partecipants: [partecipants]}, function(err, created){
                              if (err) {
                                console.log(err);
                              } else {
                                    try {
                                        created.messages.push(dataReceived.message);
                                        created.save();
                                        User.findById(dataReceived.idUser, function(err, user){
                                              if (err) {
                                                  console.log(err);
                                                  return;
                                              }
                                              try {
                                                  user.conversations.push(created._id);
                                                  user.save();
                                                  socket.broadcast.emit('startSupport', created);

                                              } catch (e){
                                                  console.log('errore in push conversation ' + e);
                                              }
                                        });
                                    } catch (e) {
                                        console.log('error to insert in user conversation array')
                                        console.log(e);
                          }}});
                    }
                }
              });

              } catch (e) {
                      console.log(e);
              }
      });


      socket.on('messageToAdmin', function(dataReceived) {
        const idChat = dataReceived.idChat
        const message = dataReceived.m;
        console.log(dataReceived);

        Conversation.findById(idChat,function(err, conversation){
                try {
                    conversation.messages.push(message);
                    conversation.save();
                    console.log('conversation saved');
                    socket.broadcast.emit('messageToAdmin', message, idChat);
                } catch (e){
                    console.log(e);
                }
        });
      });

        socket.on('messageToUser', function(dataReceived) {
          const idChat = dataReceived.idChat
          const message = dataReceived.m;
          console.log(dataReceived);

          Conversation.findById(idChat,function(err, conversation){
                  try {
                      conversation.messages.push(message);
                      conversation.save();
                      console.log('conversation saved');
                      socket.broadcast.emit('messageToUser', message, idChat);
                  } catch (e){
                      console.log(e);
                  }
          });
        });

       socket.on('disconnect', function(reason){
         console.log('disconnected' + socket.id);
          // console.log(reason);
          // console.log(socket.id)
        //  connectedAdmins.forEach(function(element){
        //     var index = connectedAdmins.indexOf(element);
        //     if (element.id == socket.id) {
        //         connectedAdmins.splice(index, 1);
        //         socket.broadcast.emit('adminDisconnected', );
        //     }
        //  });

          OnlineAdmin.deleteOne({"socketID" : socket.id }, function(err, callback){
              if(err){
                console.log(err);
              }
              console.log(callback + ' deleted');
              OnlineAdmin.find(function(err, data){
                if (err) {
                  console.log('errooo')
                }
                console.log('find all admin online');
                console.log(data);
                socket.broadcast.emit('onlineAdmin', data);
            });


          });
       })

    });



    app.get("/",function(req, res){
      //  res.redirect("http://localhost:4200");
      res.end();
   })


   app.get("*", function(req,res){
      // res.redirect("http://localhost:4200");
      res.end();
   });

   // MIDDELWARE
    function isLoggedIn(req, res, next){
      if (req.isAuthenticated()){
          return next();
      }
      res.redirect("/login");
    }


server.listen(3000);
