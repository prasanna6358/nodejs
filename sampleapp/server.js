var express = require('express');
var app = express();

app.use(express.static('sampleapp'));

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/action',urlencodedParser, function (req, res) {
  var username = req.body.username;
    var password = req.body.password;
	var language = req.body.language;
   console.log('username and password is %s ,%S'+username,password);
   res.write('<h1>'+username+' '+password+'</h1>');
   res.write('<h5> you have selected language '+language+'</h5>');
   if(language=='C#')
   {
	   res.write('<h5> your answer is correct '+language+'</h5>');
   }
   else{
	   res.write('<h5> you have selected wrong answer</h5>');
   }
   res.end();
})

var server = app.listen(8085, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
