var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io');
var server = http.createServer(app);
server.listen(3001);
io = io.listen(server);
var users = [];
var ids =[];
app.get('/',function(req,res)
{
	res.sendFile( __dirname +'/index.html');
});

io.on('connection', function(socket){
  console.log('A user connected '+socket.id);
  ids.push(socket.id);

   setTimeout(function(){
    socket.send('Sent a message 4 seconds after connection!');
  }, 4000);

   socket.on('msg', function(data){
      io.sockets.emit('newmsg', {user:data.user,message:data.message,allusers:users});
  });


  socket.on('setUsername', function(data){
	 if(users.indexOf(data)==-1){
      users.push(data);
      socket.emit('newUser', {username:data,message:'new user created with name '+data+' available users '+users});
    }
    else{
      socket.emit('exists', data + ' username is already exist! Try some other some other time');
    }
});

  socket.on('disconnect', function () {
    var index = ids.indexOf(socket.id);
    ids.pop(socket.id);
    users.splice(index,1);
    console.log('A user disconnected '+socket.id);
    console.log(ids);

  });

});