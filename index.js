var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
var jade = require("jade");
var mongoose = require("mongoose");
var braintree = require("braintree");

var TwitterStrategy = require("passport-twitter").Strategy;
var passport = require("passport");
var configDB = require('./config/database.js');
var confBraintree = require('./config/braintreeconf.js')
//var twitter = require("./config/oauth.js");
var cookieParser = require('cookie-parser');

var configDB = require('./config/database.js');
var User = require("./models/user.js");

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'hDpOw5xvmp4P5VaogPIyqxW79',
  consumer_secret: '0YyMNRYrOyWu1R8HD3N74Ze0aMXFi2TZALxZ00yrR5Aeg7yQzs',
  access_token_key: '463726282-wH7LEiV8n3nW46vam6MA96j9Lot1NNiqiOkH0GKl',
  access_token_secret: 'EMF5bHsVh12pGMyoUSJnVoldtWh1t809QM3iorzOGeZJb'
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


mongoose.connect(configDB.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("database up");
});

/*client.stream('statuses/filter', {track: 'Donate100'}, function(stream) {
  stream.on('data', function(tweet) {  
    userDonate(tweet.user);
  });

  stream.on('error', function(error) {
    throw error;
  });
});*/

function isUserRegistered(userId, callback){
	User.find({twitterId: userId}, function(err, user){
		if (err){
			console.log(err);
			return false;
		}
		else {
			console.log("found:");
			console.log(user);
			callback();
		}
	});
}

function userDonate(user) {
	isUserRegistered(user.id, function(){
		console.log(user.id);
		console.log(user.name);
		console.log("user register");
	});
}

app.get("/login", function(req,res) {
	isUserRegistered(488277192, function(){
		res.send("found");
	});
});

app.set("view engine", "jade");

app.use(express.static('public'));

app.get('/', function (req, res) {
	var allusers = User.find(function (err, users) {
  			if (err) {
  				return console.error(err);
  			}
  			res.send(users);
		});
});

app.get("/newtweet",function(req,res) {
	res.render("newtweet", {name: "Robert"});
});


app.get("/connect",function(req,res) {
	var gateway = braintree.connect({
	    environment:  braintree.Environment.Sandbox,
	    merchantId:   confBraintree.merchantId,
	    publicKey:    confBraintree.publicKey,
	    privateKey:   confBraintree.privateKey
	});

	gateway.clientToken.generate({}, function (err, response) {
    	//console.log(response.clientToken);
    	res.render("connect", {token: response.clientToken});
  	});
	
});

app.post("/submit", function(req,res) {
	var nonce = req.body;
	console.log(nonce);

	var gateway = braintree.connect({
	    environment:  braintree.Environment.Sandbox,
	    merchantId:   confBraintree.merchantId,
	    publicKey:    confBraintree.publicKey,
	    privateKey:   confBraintree.privateKey
	});

	gateway.customer.create({
		paymentMethodNonce: nonce
	}, function (err, result) {
		console.log(err);
		console.log(result.success);
		// true

		//console.log(result.customer.id);
		// e.g 160923

		//console.log(result.customer.paymentMethods[0].token);
		// e.g f28wm
	});
	//res.send("payment and twitter saved");
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});