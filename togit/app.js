var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');
var server = http.createServer(app);
server.listen(3001);
io = io.listen(server);
var count = 0;


app.get('/',function(req,res)
{
	res.sendFile( __dirname +'/index.html');
});


io.on('connection', function(socket){
  count++;
setTimeout(function(){
    socket.send('no of clients after 10 seconds!'+count);
  }, 5000);

  socket.on('disconnect', function () {
  	count--;
    console.log('A user disconnected');
  });

});