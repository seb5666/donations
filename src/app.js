/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var splashScreen = new UI.Card({banner: 'LOGO_EXAMPLE'});
splashScreen.show();

var main = new UI.Card({
  title: "#donate",
  body: "Companion dashboard app for #donate"
});

main.show();

