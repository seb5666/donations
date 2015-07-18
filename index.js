var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var jade = require("jade");
var mongoose = require("mongoose");
var configDB = require('./config/database.js');
var User = require("./models/user.js")

mongoose.connect(configDB.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("database up");
});

app.set("view engine", "jade");

app.use(express.static('public'));

app.get("/login", function(req,res) {


});

//app.post("/login",)

app.get('/', function (req, res) {

	var allusers = User.find(function (err, users) {
  			if (err) {
  				return console.error(err);
  			}
  			res.send(users);
		});
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