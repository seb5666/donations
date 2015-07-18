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

// Splash screen for the app
var splashScreen = new UI.Window({fullscreen:true});

var image = new UI.Image({
    image: 'images/logo2.png'
});
splashScreen.add(image);

splashScreen.show();


// First landing page for the Pebble app
var main = new UI.Card({
  title: "#donate",
  body: "Companion dashboard app for #donate",
  textAlign: 'center'
});

function getData(){
  main.body("Press select to continue. \n\nLoading data...");
  ajaxResponseReceived = false;
  Response = null;
  
  ajax({url:'https://api.random.org/json-rpc/1/invoke', type: 'json'},
       function(data) {
         Response = data;
         ajaxResponseReceived = true;
         console.log('Received data!');
         Vibe.vibrate('short');
         main.body('Press select to browse. \n\n Shake to refresh.');
       },
       function(error){
         console.log('Error receiving data from:');
         main.body("Could not download posts. \n\n Shake to try again.");
       }
    );
}

main.show();
//getData();

main.on('click', 'select', function(e){
  var appMenu = new UI.Menu({
    sections: [{
      title: "Main Menu",
      items: [{
        title: "Your campaigns",
        subtitle: "A list of your current active campaigns"
      },{
        title: "Current donation totals",
        subtitle: "Check the current total"
      }
             ]}
            ]}
          ); 
  appMenu.show();
  
  appMenu.on('select', function(e) {
    var appDetails = new UI.Card({
      title: "Money raised:",
      body: '',
      scrollable: true
      });
    
    appDetails.show();
  });
  
  appMenu.on('accelTap', function(e) {
    console.log('Shake detected.');
    getData();
  });
});

  
  
// Show donation total here
var newDonationTotal = new UI.Card({
  scrollable: true,
});






