var express = require('express');
var app = express();
var port = process.env.PORT || 8083;
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


mongoose.connect(configDB.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("database up");
});

client.stream('statuses/filter', {track: 'Donate100'}, function(stream) {
  stream.on('data', function(tweet) {  
    userDonate(tweet.user);
  });

  stream.on('error', function(error) {
  	console.log(error);
    throw error;
  });
});

var isUserRegistered = function(userId, successCallback){
	// find each person with a last name matching 'Ghost'
	var query = User.findOne({ 'twitterId': userId });

	// selecting the `name` and `occupation` fields
	query.select('twitterId');

	// execute the query at a later time
	query.exec(function (err, user) {
	  if (err) return handleError(err);
	  if(user){
			console.log("logged");
			console.log(user);
		} else {
			console.log("not logged");
		}
		successCallback();
	})
	// User.find({'twitterId': 124124}, function(err, user){
	// 	console.log(err);
	// 	if (err){
	// 		console.log(err);
	// 	}
	// 	else {
	// 		if(user){
	// 			console.log("logged");
	// 			console.log(user);
	// 		} else {
	// 			console.log("not logged");
	// 		}
	// 		successCallback();
	// 	}
	// });
}

function userDonate(user) {
	isUserRegistered(user.id , 
	function(){
		console.log(user.id);
		console.log(user.name);
		//console.log("user registered");
	});
}

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
	console.log(req);
	console.log(req.body);
	var nonce = req.body.payment_method_nonce;
	console.log(nonce);

	var gateway = braintree.connect({
	    environment:  braintree.Environment.Sandbox,
	    merchantId:   confBraintree.merchantId,
	    publicKey:    confBraintree.publicKey,
	    privateKey:   confBraintree.privateKey
	});

	/*gateway.customer.create({
		paymentMethodNonce: nonceFromTheClient
	}, function (err, result) {
		result.success;
		// true

		result.customer.id;
		// e.g 160923

		result.customer.paymentMethods[0].token;
		// e.g f28wm
	});*/
	
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});