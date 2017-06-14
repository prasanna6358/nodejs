var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');
var server = http.createServer(app);
var assert = require('assert');
server.listen(3001);
io = io.listen(server);
 var Server = require('mongodb').Server;
var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var url = "mongodb://localhost:27017/Prasanna";
var db = new Db('Prasanna', new Server('localhost', 27017));
app.get('/',function(req,res)
{
	res.sendFile( __dirname +'/index.html');
});


io.on('connection', function(socket){
  console.log('A user connected '+socket.id);
  
   setTimeout(function(){
    socket.send('Sent a message 4 seconds after connection!');
  }, 4000);

   socket.on('commentdata',function(data)
   {
    console.log(data);
    
    db.open(function(err, db) {
   var collection = db.collection("testcomments");
   collection.insert([{name:data.user,comment:data.message}], function(err, result) {
    assert.equal(null, err);
    console.log(result);

    
      collection.find({}).toArray(function (err, result) {
      assert.equal(null, err);
      console.log('testing comments');
      console.log(result);
      socket.emit('allcomments', {result});
      db.close();
         })
      })
   })
  });
  socket.on('disconnect', function () {
    console.log('A user disconnected '+socket.id);
   })
 });