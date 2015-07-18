var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var jade = require("jade");


var configDB = require('./config/database.js');

app.set("view engine", "jade");

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get("/newtweet",function(req,res) {
	res.render("newtweet");
});

app.get("/connect",function(req,res) {
	res.render("connect");
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});