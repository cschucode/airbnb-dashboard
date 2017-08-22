var configs         = require('../../config/auth.js')[process.env.NODE_ENV]; // auth configs
var config          = configs.instagram;

exports.getTokenOptions = function(authCode) {
  var hashedClientIdAndSecret = new Buffer(config.client_id + 
    ":" + config.client_secret).toString("base64");

	return {
    method:             'post',
    url:                config.base_url + config.grant_uri,
    headers: {
      'content-type':   'application/x-www-form-urlencoded',
      'Authorization':  'Basic' + ' ' + hashedClientIdAndSecret,
    },
    form: {
      'client_id':      config.client_id,
      'client_secret':  config.client_secret,
      'grant_type':     config.grant_type,
      'code':           authCode,
      'redirect_uri':   config.redirect_uri,
    }		
	}
}

exports.getProfileOptions = function(account) {
	return {
    method:               'get',
    url:                  config.base_url + account.profile_uri,
    qs: {
      access_token:       account.service_name.token,
    },    
	}
}

exports.getRecentFeedsOptions = function(account) {
	return {
    method:               'get',
    url:                  config.base_url + account.feed_uri,
    qs: {
      access_token:       account.service_name.token,
    },
  }
}