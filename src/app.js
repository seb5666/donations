/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Response;
var ajaxResponseReceived = false;

// Currently not working
var splashScreen = new UI.Card({banner: 'LOGO_EXAMPLE'});
splashScreen.show();

// First landing page for the Pebble app
var main = new UI.Card({
  title: "#donate",
  body: "Companion dashboard app for #donate"
});

function getData(){
  main.body("Press select to continue. \n\nLoading data...");
  ajaxResponseReceived = false;
  Response = null;
  
  ajax({url:'', type: 'json'},
       function(data) {
         Response = data;
         ajaxResponseReceived = true;
         console.log('Received data!');
         Vibe.vibrate('short');
         main.body('Press select to browse. \n\n Shake to refresh.');
       },
       function(error){
         console.log('Error receiving data from 'url'');
         main.body("Could not download posts. \n\n Shake to try again.");
       }
    };
}

main.show();
getData();

  
  
// Show donation total here
var newDonationTotal = new UI.Card({
  scrollable: true,
});






