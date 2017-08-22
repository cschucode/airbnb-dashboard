var findKeyValue    = require('../helpers.js').findKeyValue; 

module.exports = function() {
  return {
    profileParser: function(body, cb) {
      var parsedBody = JSON.parse(body);
      var followerCount = findKeyValue(parsedBody, 'followers_count');

      var results = {
        followerCount:      followerCount,
        profileData: {
          follower_count:   followerCount,
          name:             findKeyValue(parsedBody, 'screen_name'),
          likes:            findKeyValue(parsedBody, 'favourites_count')
        }
      }
      cb(results);
    },
    feedParser: function(body, cb) {
      var data  = JSON.parse(body);
      var feeds = [];

      data.forEach(function(post, idx) {
        var formattedDate   = new Date(findKeyValue(post, 'created_at'));
        formattedDate       = formattedDate.toDateString('MM-dd-YY') + ' ' + formattedDate.toLocaleTimeString({formatMatcher: 'best fit'});


        feeds.push({
          message:        findKeyValue(post, 'text'),
          image:          findKeyValue(post, 'image'),
          username:       findKeyValue(post.user, 'name'),
          created_on:     formattedDate,
          counts:         {
            retweet_count: findKeyValue(post, 'retweet_count'),
            favorite_count: findKeyValue(post, 'favorite_count') 
          }
        })
      })
      cb(feeds);
    }
  }
}
