var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var accountSchema = mongoose.Schema({
	account_name:		String, // airbnb
	service_name: 	{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // facebook, twitter
	service: 				String,
	profile_uri: 		String,
	feed_uri:  			String,
	country: 				String
});

accountSchema.pre('save', function(next) {
	var profileSlash = this.profile_uri.slice(0,1);
	var feedSlash = this.feed_uri.slice(0,1);

	if (profileSlash !== '/')	this.profile_uri = '/' + this.profile_uri;
	if (feedSlash !== '/') this.feed_uri = '/' + this.feed_uri;
	
	next();
});


module.exports = mongoose.model('Account', accountSchema);