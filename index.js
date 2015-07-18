var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var jade = require("jade");
var mongoose = require("mongoose");
var braintree = require("braintree");

var TwitterStrategy = require("passport-twitter").Strategy;
var passport = require("passport");
var configDB = require('./config/database.js');
var confBraintree = require('./config/braintreeconf.js')
//var twitter = require("./config/oauth.js");
var cookieParser = require('cookie-parser');
var User = require("./models/user.js")

mongoose.connect(configDB.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("database up");
});

var isUserRegistered = function(twitterId){
	User.find({ "twitterId" : twitterId }, function(err,user) {
		if (err) {
  			return false;
  		}
  		return true;
	})
}

app.set("view engine", "jade");

app.use(express.static('public'));

app.get("/login", function(req,res) {
	res.send(isUserRegistered("dkasjhfjks"));
});

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
	var nonce = req.body.payment_method_nonce;
	console.log(nonce);

	var gateway = braintree.connect({
	    environment:  braintree.Environment.Sandbox,
	    merchantId:   confBraintree.merchantId,
	    publicKey:    confBraintree.publicKey,
	    privateKey:   confBraintree.privateKey
	});

	gateway.customer.create({
		paymentMethodNonce: nonceFromTheClient
	}, function (err, result) {
		result.success;
		// true

		result.customer.id;
		// e.g 160923

		result.customer.paymentMethods[0].token;
		// e.g f28wm
	});
	
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});