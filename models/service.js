var express		= require('express');
var app 			= express();

var mongoose 	= require('bluebird').promisifyAll(require('mongoose'));
var config 		= require('../config/auth.js')[process.env.NODE_ENV];

var log 			= require('winston');

var services 	= Object.keys(config);

var serviceSchema = mongoose.Schema({
	service_name:		{ // twitter, facebook, etc...
		type: String, 
		validate: { 
			validator: function(val, cb) { 
				if (services.indexOf(val) > -1) {
					cb(true);
				} else {
					cb(false);
				}
			},
			msg: 'This service is not available.'
		},
		required: true,
	},
	account_name: 	[ { type: mongoose.Schema.Types.ObjectId, ref: 'Account' } ],
	client_id: 			String,
	token: 					String,
	updated_on: 		{ type: Date, default: Date.now },
	created_on: 		{ type: Date, default: Date.now, set: function(val) { return undefined} },
});

// created_on date should not change 
serviceSchema.pre('save', function(next) {
	if (!this.isNew) this.created_on = undefined;
	next()
});


// client_id should be what's in config/auth.js, so we force to that value
serviceSchema.pre('save', function(next) {
	this.client_id = config[this.service_name].client_id;
	next();
});

serviceSchema.static('saveToken', function(clientId, token, cb) {
	this.findOne({'client_id': clientId}).exec(function(err, service) {
		if (err) {
			log.error('Failed to save token.', err);
			return err;
		}
		service.token = token;
		log.info('Successfully saved token for ' + service.service_name + ' to db.');
		service.save(cb);
	})
})



module.exports = mongoose.model('Service', serviceSchema);
