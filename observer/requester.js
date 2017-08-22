var Promise     = require('bluebird');
var request     = Promise.promisify(require('request'), {multiArgs: true});
var log         = require('winston');

// var facebookFeedData  = require('../feed_data/facebook_feed')(); // REMOVE FOR PRODUCTION
// var twitterFeedData   = require('../feed_data/twitter_feed')(); // REMOVE FOR PRODUCTION
// var instagramFeedData = require('../feed_data/instagram_feed')(); // REMOVE FOR PRODUCTION

module.exports = function() {
  return {
    requestToken: function(optionsObject, cb) {
      return request(optionsObject)
        .spread(function(response, body) {
          cb(null, response, body);
        })
        .catch(function(err) {
          log.error('Failed to retrieve token.', err.message.trim());
          cb(err);
        })
    },
    requestProfile: function(optionsObject, cb) {
      return request(optionsObject)
        .spread(function(response, body) {
          cb(null, response, body);
        })
        .catch(function(err) {
          log.error('Failed to retrieve profile.', err.message.trim());
          cb(err);
        })
    },
    requestRecentFeeds: function(optionsObject, cb) {
      // return cb(null, null, twitterFeedData); // REMOVE FOR PRODUCTION
      // return cb(null, null, facebookFeedData); // REMOVE FOR PRODUCTION
      // return cb(null, null, instagramFeedData); // REMOVE FOR PRODUCTION

      return request(optionsObject)
        .spread(function(response, body) {
          cb(null, response, body);
        })
        .catch(function(err) {
          log.error('Failed to retrieve feed.', err.message.trim());
          cb(err);
        })
    }
  }
}