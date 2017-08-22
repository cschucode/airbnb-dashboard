var Promise         = require('bluebird');
var mongoose        = Promise.promisifyAll(require('mongoose'));

// models
var Service         = Promise.promisifyAll(require('../models/service'));
var Account         = Promise.promisifyAll(require('../models/account'));
var Observation     = Promise.promisifyAll(require('../models/observation'));

// auth configs
var configs         = require('../config/auth.js')[process.env.NODE_ENV];
var config 					= configs.instagram;

var findKeyValue    = require('./helpers.js').findKeyValue; 
var requester 			= require('./requester')();

var options 				= require('./options/instagramOptions');
var parser 					= require('./parsers/instagram_parser')();

exports.getGrantCode = function(req, res, next) {
	var base = config.base_url + config.auth_uri;
	var query = '?client_id=' + config.client_id + '&response_type=code&scope=read&redirect_uri=' + config.redirect_uri;
	var uri = base + query;

	res.redirect(uri);
}

exports.getToken = function(req, res, next) {
	var authCode = req.query.code;

	var reqOptions = options.getTokenOptions(authCode);

	requester.requestToken(reqOptions, function(err, response, body) {
		if (err) return next(err);

		var token = JSON.parse(body).access_token.value;

		Service.saveToken(config.client_id, token, function(err, service) {
			if (err) return next(err);
			res.redirect('/admin');
		});
	})
}

exports.getProfile = function(req, res, next) {
 	Account.findById(req.params.id).populate('service_name').execAsync()
   	.then(function(account) {
     	if (!account) return next(new Error('db lookup error: no account found.'));

     	var reqOptions = options.getProfileOptions(account);

     	requester.requestProfile(reqOptions, function(err, response, body) {
     		if (err) return next(err);
 		  	if (body) {
 		  		parser.profileParser(body, function(results) {
			  		var newObservation = new Observation();
			  		newObservation.saveObservation(account, results.followerCount, results.profileData, body);
 		  		});
 		  	}
     	})
     	return Observation.findOne({'account_name': account._id}).sort({created_on: -1}).execAsync()
	     	.then(function(observation) {
	       	return res.json(observation);
	     	})
   	})
   	.catch(function(err) {
     	return next(err);
   	})
}

exports.getRecentFeeds = function(req, res, next) {
	Account.findById(req.params.id).populate('service_name').execAsync()
	  .then(function(account) {
	    if (!account) return next(new Error('db lookup error: no account found.'));

	    var reqOptions = options.getRecentFeedsOptions(account);

	    return requester.requestRecentFeeds(reqOptions, function(err, response, body) {
	      if (err) return next(err);
	      parser.feedParser(body, function(results) {
	        return res.json(results);
	      });
	    })
	  })
	  .catch(function(err) {
	    return next(err);
	  })
}