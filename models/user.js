var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
		name         : { type: String, required: true }, 
    email        : { type: String, required: true, unique: true },
    password     : { type: String, required: true },
    admin        : Boolean,
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);