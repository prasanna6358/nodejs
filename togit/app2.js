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

var clients = 0;

io.on('connection', function(socket){
	 clients++;
socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
 socket.on('disconnect', function () {
	       clients--;
		socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
             });
});