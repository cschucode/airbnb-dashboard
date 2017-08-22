var findKeyValue    = require('../helpers.js').findKeyValue; 


// FB feed url
// /324826532457/posts/?fields=description,story,message,picture,shares,likes.summary(true),created_time,name&limit=10

module.exports = function() {
	return {
		profileParser: function(body, cb) {
			var parsedBody = JSON.parse(body);
			var followerCount = findKeyValue(parsedBody, 'count');

      var results = {
        followerCount:      followerCount,
	    	profileData: {
			    follower_count:   followerCount,
			    name:             findKeyValue(parsedBody, 'username'),
			    likes:            findKeyValue(parsedBody, 'talking_about_count')
	  	  }
			}
  	  cb(results);
		},
		feedParser: function(body, cb) {
      var data  = JSON.parse(body).data;
      var feeds = [];

      data.forEach(function(post, idx) {
        var formattedDate   = new Date(findKeyValue(post, 'created_time'));
        formattedDate       = formattedDate.toDateString('MM-dd-YY') + ' ' + formattedDate.toLocaleTimeString({formatMatcher: 'best fit'});

	var message = '';
	if(post.message) { message = post.message } 
	else if (post.name) { message = post.name }
	else if (post.story) { message = post.story }

	var counts = {}	
	if(post.shares) { counts.share_count = post.shares.count } else { counts.share_count = null }
	if(post.likes) { counts.like_count = post.likes.summary.total_count } else { counts.like_count = null }
		
        feeds.push({
          message:     	message, 
          image:          findKeyValue(post, 'picture'),
          username:       findKeyValue(post, 'name'),
          created_on:     formattedDate,
          counts:         counts,
        })
      })
      cb(feeds);
		}
	}
}
