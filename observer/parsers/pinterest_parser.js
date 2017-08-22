var findKeyValue    = require('../helpers.js').findKeyValue; 

module.exports = function() {
	return {
		profileParser: function(body, cb) {
			var parsedBody = JSON.parse(body);
			var followerCount = findKeyValue(parsedBody, 'followers');

      var results = {
        followerCount:      followerCount,
	    	profileData: {
			    follower_count:   followerCount,
			    name:             findKeyValue(parsedBody, 'username'),
			    likes:            findKeyValue(parsedBody, 'following')
	  	  }
			}
  	  cb(results);
		},
		feedParser: function(body, cb) {
      var data = body;
      var feeds = [];

      data.forEach(function(post) {
        var rawContent      = findKeyValue(post, 'content');
        var img             = rawContent.match(/src="(.*)"/)[1];
        var message         = rawContent.match(/<\/p><p>(.*)<\/p>/)[1];
        var formattedDate   = new Date(findKeyValue(post, 'published'));
        formattedDate       = formattedDate.toDateString('MM-dd-YY');

        feeds.push({
          message:       findKeyValue(post, 'title'),
          image:         img,
          content:       message,
          username:      findKeyValue(post, 'name'),
          created_on:    formattedDate,
          counts:        {}
        })
      });
      cb(feeds);
		}
	}
}
