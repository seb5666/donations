// var express = require('express');
var Twitter = require('./lib/twitter');

var client = new Twitter({
  consumer_key: 'hDpOw5xvmp4P5VaogPIyqxW79',
  consumer_secret: '0YyMNRYrOyWu1R8HD3N74Ze0aMXFi2TZALxZ00yrR5Aeg7yQzs',
  access_token_key: '463726282-wH7LEiV8n3nW46vam6MA96j9Lot1NNiqiOkH0GKl',
  access_token_secret: 'EMF5bHsVh12pGMyoUSJnVoldtWh1t809QM3iorzOGeZJb'
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){

	client.stream('statuses/filter', {track: 'donate10'}, function(stream) {
		stream.on('data', function(tweet) {
			console.log(tweet.text + "\n\n");
			console.log(tweet)
		});
	
		stream.on('error', function(error) {
	    	throw error;
	  	});
	});
});

http.listen(5001, function(){
  console.log('listening on *:5001');
});