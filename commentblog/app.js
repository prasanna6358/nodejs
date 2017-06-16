var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');
var server = http.createServer(app);
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
    MongoClient.connect(url, function(err, db) {  
    if (err) throw err;  
       console.log("Database created!");
     })
     db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Table created!");
    })
     MongoClient.connect(url, function(err, db) {
    if (err) throw err;
     var myobj = { name:data.user, comment:data.message  };
     db.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
  })
     db.collection("users").find({}).toArray(function(err, result) {  
    if (err) throw err;
       console.log(result.name);
       socket.emit('allcomments', {name:result.name,_commentdata:result.comment});
       db.close();  
       })
   });

  socket.on('disconnect', function () {
    console.log('A user disconnected '+socket.id);

   });

 });
 });