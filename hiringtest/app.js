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

app.get('/admin',function(req,res)
{
    res.sendFile(__dirname +'/admin.html');
});

io.on('connection', function(socket){
  console.log('A user connected '+socket.id);


   setTimeout(function(){
    socket.send('Now you are connected to the server!!!');
  }, 4000);

 socket.on('questionsAnswersdata',function(data)
   {
    console.log(data);
    
    db.open(function(err, db) {
    var collection = db.collection("HireProcess");
    collection.insert([{username:data._userName,userEmail:data._userEmail,questionAnswers:data._questionAnswersData}], function(err, result) {
    assert.equal(null, err);
    console.log(result);
        })
     })
  });
  socket.on('disconnect', function () {
    console.log('A user disconnected '+socket.id);

   });

 });