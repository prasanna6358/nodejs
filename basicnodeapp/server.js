var http = require('http');
var fs = require("fs");
var count = 0;
http.createServer(function(request, response) {
count++;
console.log(count);
if(request.url === "/index"){
   fs.readFile("index.html", function (err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
   });
}
else{
   response.writeHead(200, {'Content-Type': 'text/html'});
   response.write('<b>Hey there!</b><br /><br />This is the default response for ur request ' + request.url);
   response.end();
}
}).listen(3001);
