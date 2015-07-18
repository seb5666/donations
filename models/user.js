var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({
    twitterId: String,
    brainTreeToken: String,
});

var User = mongoose.model("User", userSchema);

module.exports = User;