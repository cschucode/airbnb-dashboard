var findKeyValue    = require('../helpers.js').findKeyValue; 

module.exports = function() {
	return {
		profileParser: function(body, cb) {
			var parsedBody = JSON.parse(body);
			var followerCount = findKeyValue(parsedBody, 'followed_by');

      var results = {
        followerCount:      followerCount,
	    	profileData: {
			    follower_count:   followerCount,
			    name:             findKeyValue(parsedBody, 'username'),
			    likes:            findKeyValue(parsedBody, 'follows')
	  	  }
			}

  	  cb(results);
		},
		feedParser: function(body, cb) {
      var data  = JSON.parse(body);
      var feeds = [];

      data.forEach(function(post, idx) {
      	var createdOn 	= new Date(1970,0,1,0);
      	createdOn 			= createdOn.setSeconds(Number(findKeyValue(post, 'created_time')))
      	createdOn 			= new Date(createdOn);
      	createdOn     	= createdOn.toDateString('MM-dd-YY') + " " + createdOn.toLocaleTimeString({formatMatcher: 'best fit'});

    		feeds.push({
    		  message:    	findKeyValue(post, 'message'),
    		  image:      	findKeyValue(post, 'image'),
    		  username:   	findKeyValue(post, 'username'),
    		  created_on: 	createdOn,
    		  counts:     	findKeyValue(post, 'counts'),
    		})
      })
      cb(feeds);
		}
	}
}