var configs       = require('../../config/auth.js')[process.env.NODE_ENV]; // auth configs
var config        = configs.facebook;

exports.getTokenOptions = function() {
	return {
    method:             'get',
    url:                config.base_url + config.grant_uri,
    headers: {
      'content-type':   'application/x-www-form-urlencoded'
    },
    qs: {
      grant_type:       config.grant_type,
      client_id:        config.client_id,
      client_secret:    config.client_secret,
    }, 		
	}
}

exports.getProfileOptions = function(account) {
	return {
    method:             'get',
    url:                config.base_url + account.profile_uri,
    headers: {
      'Authorization':  'Bearer ' + account.service_name.token,
    }
	}
}

exports.getRecentFeedsOptions = function(account) {
	return {
    method:             'get',
    url:                config.base_url + account.feed_uri,
    headers: {
      'Authorization':  'Bearer ' + account.service_name.token,
    }
  }
}