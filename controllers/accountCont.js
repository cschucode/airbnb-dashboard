var express   = require('express');
var app       = express();

// MODELS
var Promise 	= require('bluebird');
var Account 	= Promise.promisifyAll(require('../models/account'));
var Service 	= Promise.promisifyAll(require('../models/service'));

var mongoose 	= require('mongoose');
var ObjectId 	= mongoose.Types.ObjectId;

// AUTH CONFIGS
var configs 	= require('../config/auth.js')[process.env.NODE_ENV];


exports.getAccounts = function(req, res, next) {
	// gets and returns all accounts
	var ctx = {};

	Account.find({}).populate('service_name').execAsync()
		.then(function(accounts) {
			ctx.accounts = accounts;
			return Service.find({}).execAsync();
		})
		.then(function(services) {
			ctx.configuredServices 	= Object.keys(configs);
			ctx.page 								= 'accounts';
			return res.render('accounts', ctx);
		})
		.catch(function(err) {
			return next(err);
		})
};

exports.postAccount = function(req, res, next) {
	// create/modify accounts, redirect to accounts page
  Account.findById(req.body._id).populate('service_name').execAsync()
  	.then(function(account) {
  		if (!account) {
  			return Service.findOne({'service_name': req.body.service_name}).populate('account_name').execAsync()
  				.then(function(service) {
  					if (!service) throw new Error('db lookup failed: service not found.');
	  					var newAccount 					= new Account()
	  					newAccount.account_name	= req.body.account_name;
	  					newAccount.country 			= req.body.country;
	  					newAccount.service_name = new ObjectId(service._id);
	  					newAccount.service 			= service.service_name
	  					newAccount.profile_uri	=	req.body.profile_uri;
	  					newAccount.feed_uri 		=	req.body.feed_uri;
	  					service.account_name.push(newAccount);
	  					service.save();
	  					newAccount.save();
  				})
  		} else {
	      account.account_name = req.body.account_name;
  			account.country 		 = req.body.country;
	      account.profile_uri  = req.body.profile_uri;
	      account.feed_uri 		 = req.body.feed_uri;
	      account.save()
  		}
  	})
  	.then(function() {
  		res.redirect('/admin/accounts');
  	})
  	.catch(function(err) {
  		return next(err);
  	})
}

exports.deleteAccount = function(req, res, next) {
	// delete an account, then redirect to accounts page
	Account.findById(req.params.id).populate('service_name').execAsync()
		.then(function(account) {
			if (!account) throw new Error('db lookup failed: Account not found.');
			return account;
		})
		.then(function(account) {
			return account.remove();
		})
		.then(function(account) {
			res.redirect('/admin/accounts');
		})
		.catch(function(err) {
			return next(err);
		})
}