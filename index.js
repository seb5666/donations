var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var jade = require("jade");
var mongoose = require("mongoose");
var braintree = require("braintree");

var TwitterStrategy = require("passport-twitter").Strategy;
var passport = require("passport");
var configDB = require('./config/database.js');
var twitter = require("./config/oauth.js");
var cookieParser = require('cookie-parser');
var configDB = require('./config/database.js');


mongoose.connect(configDB.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  	// yay!
  	console.log("ashflkjhsa");
  	var kittySchema = mongoose.Schema({
    	name: String
	});

	var Kitten = mongoose.model('Kitten', kittySchema);

	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // 'Silence'
});

app.set("view engine", "jade");

app.use(express.static('public'));

app.get("/login", function(req,res) {

});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get("/newtweet",function(req,res) {
	res.render("newtweet", {name: "Robert"});
});

app.get("/connect",function(req,res) {
	res.render("connect");
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});