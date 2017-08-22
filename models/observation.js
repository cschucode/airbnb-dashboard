var mongoose 	= require('bluebird').promisifyAll(require('mongoose'));
var moment 		= require('moment');
var log       = require('winston');

var observationSchema = mongoose.Schema({
	account_name:				{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
	service_name: 			{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
	service: 						String,
	account: 						String,
	profile_data: 			{},
	raw_data: 					{},
	status: 						{},
	follower_count: 		Number,
	created_on: 				{ type: Date, default: Date.now, set: function(val) { return undefined; } },
});


// shortcut method used for retrieving date ranges
observationSchema.statics.getWeeksProfileData = function(service, account, fromDays, toDays) {
	var lastWeek = moment().subtract(toDays, 'days').toDate();
	var thisWeek = moment().subtract(fromDays, 'days').toDate();

	return this.aggregate([
	  // Get only records created in the last 30 days
	  { $match: { account: account, service: service, "created_on":{ $gte: lastWeek, $lt: thisWeek} }},
	  { 
	  	$project: {
	  		_id: 	1,
	  		created_on: 1,
	  		account: 1,
	  		account_name: 1,
	  		servie: 1,
	  		profile_data: 1,
			  "year": 				{ $year:"$created_on" },
			  "month": 				{ $month:"$created_on" },
			  "day": 					{ $dayOfMonth:"$created_on" },
			}
	  },
	  // { $sort: {year: -1, month: -1, day: -1} },
	  { 
	  	$group: { 
			  _id: 						{ $substr: ["$created_on", 0, 10]},
			  follower_count: { $last: "$$ROOT" },
		  }
		},
	  { $sort: { _id: -1} },
	]).execAsync();
};


// shortcut method used for saving observations
observationSchema.method('saveObservation', function(account, follower_count, profile_data, raw_data) {
	this.account_name = account;
	this.account = account.account_name;
	this.service_name = account.service_name;
	this.service = account.service_name.service_name;
	this.follower_count = follower_count;
	this.profile_data = profile_data;
	this.raw_data = raw_data;
	this.status = 'ok';
	this.save(function(err, observation) {
		if (err) {
			log.error('Failed to save profile to db.', err);
			return err;
		}
		
		log.info('Successfully saved profile ' + observation.service + ':' + observation.account + ' to db.');
		return observation;
	});
});


// created_on date should not change 
observationSchema.pre('save', function(next) {
	if (!this.isNew) this.created_on = undefined;
	next()
});


module.exports = mongoose.model('Observation', observationSchema);

