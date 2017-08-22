var express  			= require('express');
var app      			= express();
var Promise 			= require('bluebird');
var moment 				= require('moment');

var passport		 	= require('passport');
var mongoose 			= Promise.promisifyAll(require('mongoose'));
var ObjectId 			= mongoose.Types.ObjectId;


// models
var User 					= Promise.promisifyAll(require('../models/user'));
var Service 			= Promise.promisifyAll(require('../models/service'));
var Account 			= Promise.promisifyAll(require('../models/account'));
var Observation 	= Promise.promisifyAll(require('../models/observation'));


exports.getLogin = function(req, res) {
  if (req.isAuthenticated()) {
	  return res.redirect('/dashboard')
  }
  res.render('index', { page: 'Log In', message: req.flash('loginMessage') }); 
};

exports.getSignup = function(req, res) {
  // render the page and pass in any flash data if it exists
  res.status(200).render('signup', { message: req.flash('signupMessage'), page: 'Sign Up' });
};

// process the signup form
exports.postSignup = function(req, res, next) {
	User.findOne({email: req.body.email}).execAsync()
		.then(function(user) {
			if (!user) {
				var user 			= new User({
					name: 			req.body.name,
					email: 			req.body.email,
					password: 	user.generateHash(req.body.password),
					admin: 			req.body.admin,
				});

				user.save();
				return res.status(200).json(user);
			}
			return next(new Error('error: user already exists.'));
		})
		.catch(function(err) {
			return next(err);
		})
};

exports.getDashboard = function(req, res) {
	// serve path to bundle.js based on environment variable
	var bundleFile = process.env.NODE_ENV === 'development' 
							? 'http://localhost:8100/bundle.js' 
							: 'scripts/bundle.js';

	res.render('dashboard', { layout: null, bundle_path: bundleFile }); 
};

// exports.getAdmin = function(req, res, next) {
// 	res.render('admin', {layout: null});
// }

exports.postLogin = passport.authenticate('local-login', {
  successRedirect : '/dashboard', // redirect to the secure home section
  failureRedirect : '/', // redirect back to the login page if there is an error
  failureFlash 		: true // allow flash messages
});

exports.getLogout = function(req, res) {
	// logs user out and destroys session
  req.logout();
  req.session.destroy();
  res.redirect('/');
}



// endpoints ----------------------------------------------------------------
exports.getDashProfile = function(req, res, next) {
	// creates a profile object for the service and account queried
	var service = req.params.service;
	var account = req.params.account;

	Account.findOne({account_name: account, service: service}).execAsync()
		.then(function(account) {
			return createProfile(account);
		})
		.then(function(profile) {
			return getCountsForXDays(profile.service, profile.account, 0, 7) // this weeks counts
				.then(function(counts) {
					profile.this_week = counts;

					return profile;
				})
		})
		.then(function(profile) {
			return getCountsForXDays(profile.service, profile.account, 7, 14) // last weeks counts
				.then(function(counts) {
					profile.last_week = counts;

					return addCountsToProfile(profile);
				})
				.then(function(profile) {
					return res.json(profile);
				})
		})
		.catch(function(err) {
			return next(err);
		})
}

function createProfile(account) {
	var profile = {
		account_id: 		account._id,
		account: 				account.account_name,
		service: 				account.service,
	};

	return profile;
}

function addCountsToProfile(profile) {
	// follower counts
	var thisWeeksFC = profile.this_week.length > 0 ? profile.this_week[0].follower_count : 0;
	var thisWeeksLastFC = profile.this_week.length > 0 ? profile.this_week[profile.this_week.length - 1].follower_count : 0;
	var fcDivisor = thisWeeksLastFC > 0 ? thisWeeksLastFC : 1;
	// var lastWeeksFC = profile.last_week.length > 0 ? profile.last_week[0].follower_count : 0;
	// var fcDivisor 	= lastWeeksFC > 0 ? lastWeeksFC : 1;

	profile.follower_count = thisWeeksFC;
	profile.fc_week_change = thisWeeksFC - thisWeeksLastFC;
	profile.fc_week_percent_change = Number((profile.fc_week_change / fcDivisor) * 100).toFixed(2) || 0;

	// like counts
	var thisWeeksLC = profile.this_week.length > 0 ? profile.this_week[0].likes : 0; 
	var thisWeeksLastLC = profile.this_week.length > 0 ? profile.this_week[profile.this_week.length - 1].likes : 0
	var lcDivisor = thisWeeksLastLC > 0 ? thisWeeksLastLC : 1;
	// var lastWeeksLC = profile.last_week.length > 0 ? profile.last_week[0].likes : 0; 
	// var lcDivisor 	= lastWeeksLC > 0 ? lastWeeksLC : 1;

	profile.likes = thisWeeksLC;
	profile.likes_week_change = thisWeeksLC - thisWeeksLastLC;
	profile.likes_week_percent_change = Number((profile.likes_week_change / lcDivisor) * 100).toFixed(2) || 0;

	return profile;
}

function getCountsForXDays(service, account, daysFrom, daysTo) {
	// ex. daysFrom = 0, daysTo = 7 would be last 7 days
	// ex. daysFrom = 7, daysTo = 14, would be prior week 
	var data = [];

	return Observation.getWeeksProfileData(service, account, daysFrom, daysTo)
		.then(function(results) {
			results.forEach(function(item) {
				item 								= item.follower_count; // this is a grouping that I have setup

				var fc 					 		= item.profile_data ? (item.profile_data.follower_count ? item.profile_data.follower_count : 0) : 0;
				var likes				 		= item.profile_data ? (item.profile_data.follower_count ? item.profile_data.likes : 0) : 0;

				var obj 						= {
					year: 						item.year,
					month: 						item.month,
					day: 							item.day,
					follower_count: 	fc,
					likes: 						likes,
				};

				data.push(obj);
			})

			return data;
		})
}
