var Twitter = require('./lib/twitter');
var es = require('event-stream');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY = 'hDpOw5xvmp4P5VaogPIyqxW79',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET = '0YyMNRYrOyWu1R8HD3N74Ze0aMXFi2TZALxZ00yrR5Aeg7yQzsT',
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY = '463726282-wH7LEiV8n3nW46vam6MA96j9Lot1NNiqiOkH0GKl',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET = 'EMF5bHsVh12pGMyoUSJnVoldtWh1t809QM3iorzOGeZJb',
});

//
// client.stream('statuses/filter', {follow: 20343405}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log("inside stream:",tweet);
//   });
//
//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });

//
// client.stream('statuses/sample', function(stream) {
//   stream.on('data', function(tweet) {
//     console.log("inside stream:",tweet);
//   });
//
//   stream.on('error', function(error) {
//     console.log(error);
//   });
//
// });


// // Load your image
// var data = require('fs').readFileSync('/Users/desmondmorris/Desktop/twitter.png');
//
// // Make post request on media endpoint. Pass file data as media parameter
// client.post('media/upload', {media: data}, function(error, media, response){
//
//   if (!error) {
//
//     // If successful, a media object will be returned.
//     console.log(media);
//
//     var status = {
//       status: 'Testing media uploads for the npm twitter module.',
//       media_ids: media.media_id_string
//     }
//
//     client.post('statuses/update', status, function(error, tweet, response){
//
//       if (!error) {
//
//         console.log(tweet);
//
//       }
//
//     });
//
//   }
// });

client.stream('statuses/firehose', function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    console.log("Get Success !!!");
  });

  stream.on('error', function(error) {
    console.log("Error in stream");
    console.log(""+error);
  });
});


// var stream = client.get('statuses/sample', {base: 'stream'});
//
// console.log(stream);
//
//
// var params = {
//   q: 'from:businessinsider filter:links soundcloud OR youtube'
// };
//
// client.get('search/tweets', params, function(err, data, res){
//   console.log(data);
//   console.log(err);
// });
