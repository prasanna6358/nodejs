var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');
var assert = require('assert');
var server = http.createServer(app);
server.listen(3001);
io = io.listen(server);
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var db = new Db('HireProcessDb', new Server('localhost', 27017));

app.get('/',function(req,res)
{
  res.sendFile( __dirname +'/index.html');
});

app.get('/user',function(req,res)
{
    res.sendFile(__dirname +'/user.html');
});
app.get('/admin', function(req,res)
{
  res.sendFile(__dirname+'/admin.html')
})

io.on('connection', function(socket) {

  console.log('A user connected '+socket.id);

    setTimeout(function(){

    socket.send('Now you are connected to the server!!!');
  }, 4000);

 socket.on('questionsAnswersdata',function(data)
   {
    console.log(data);
    
    db.open(function(err, db) {
    var collection = db.collection("HireProcess");
    collection.find({userEmail:data._userEmail}).toArray(function (err, emailresult) {
    
    console.log(emailresult);
    console.log('insede find sendemail'+data._userEmail);
    if(emailresult.length>0){
    console.log('user email found '+emailresult[0].userEmail);
    var existemail = emailresult[0].userEmail;
    if(data._userEmail==existemail)
    {
      console.log('user exist in database');
      socket.emit('sendConfirmation','you have already submitted your answers with the email id '+emailresult[0].userEmail);
      db.close();
    }
  }
    else{
    collection.insert([{username:data._userName,userEmail:data._userEmail,questionAnswers:data._questionAnswersData}], function(err, result) {
    assert.equal(null, err);
    console.log('insert');
    console.log(result);
    console.log('user not exist in database');
    socket.emit('sendConfirmation','You have submitted your answers successfully');
    db.close();
            })
        }
     })
   })
  });

      socket.on('adminsendemail',function(data) 
           {
              console.log(data);
              db.open(function(err, db) {
              var collection = db.collection('HireProcess');
              collection.find({userEmail:data.email}).toArray(function (err, result) {
                console.log(result);
                socket.emit('adminuserdata',{result})
               })
              db.close();
             })
            });

  socket.on('disconnect', function () {
    console.log('A user disconnected '+socket.id);

   });

 });
