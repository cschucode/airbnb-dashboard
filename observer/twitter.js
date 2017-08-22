var Promise       = require('bluebird');
var mongoose      = Promise.promisifyAll(require('mongoose'));

// models
var Service       = Promise.promisifyAll(require('../models/service'));
var Account       = Promise.promisifyAll(require('../models/account'));
var Observation   = Promise.promisifyAll(require('../models/observation'));

// auth configs
var configs       = require('../config/auth.js')[process.env.NODE_ENV]; // auth configs
var config        = configs.twitter;

var findKeyValue  = require('./helpers.js').findKeyValue; 
var requester     = require('./requester')();

var options       = require('./options/twitterOptions'); 
var parser        = require('./parsers/twitter_parser')();


exports.getToken = function(req, res, next) {
  var reqOptions = options.getTokenOptions();

  requester.requestToken(reqOptions, function(err, response, body) {
    if (err) return next(err);

    if (process.env.NODE_ENV === 'development') {
      var token = JSON.parse(body).access_token.value;
    } else {
      var token = JSON.parse(body).access_token;
    }

    Service.saveToken(config.client_id, token, function(err, service) {
      if (err) return next(err);
      res.redirect('/admin');
    });
  });
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



