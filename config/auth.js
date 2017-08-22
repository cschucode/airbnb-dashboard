// use 'twitter', 'facebook', 'pinterest', 'instagram' as second-level values

module.exports = {
    'development': {
        // Profile: /206266479379/?fields=engagement,talking_about_count,username
        // Feed: /206266479379/posts
        'facebook' : {
            'base_url'          : 'http://10.0.5.28:5000',
            'client_id'         : '230779346724', // your App ID
            'client_secret'     : 'gKnNSCqx7V0zPL2opz2Fhx1t', // your App Secret
            'grant_type'        : 'client_credentials',
            'grant_uri'         : '/oauth/access_token',
        },
        // Profile: /1.1/users/show.json?screen_name=airbnb
        // Feed: /1.1/statuses/user_timeline.json?count=40&exclude_replies=true&include_rts=false&screen_name=airbnb
        'twitter' : {
            'base_url'          : 'http://10.0.5.29:3002',
            'client_id'         : 'airbnb_id',
            'client_secret'     : 'airbnb_secret',
            'grant_type'        : 'client_credentials',
            'grant_uri'         : '/oauth2/token',
        },
        // Profile: /v1/users/airbnb?fields=counts,username
        // Feed: /v1/me/following/boards
        'pinterest' : {
            'base_url'          : 'http://10.0.5.28:4000',
            'client_id'         : '965398489002',
            'client_secret'     : 'Z1qjr5uRA97SvWbwspDZdIIj',
            'grant_type'        : 'authorization_code',
            'auth_uri'          : '/oauth',
            'grant_uri'         : '/v1/oauth/token',
            'redirect_uri'      : 'http://10.0.5.32:3000/auth/pinterest/callback',
            'rss_feed_url'      : 'https://pinterest.com/airbnb/feed.rss',
        },
        // Profile: /v1/users/282399208
        // Feed: /v1/users/282399208/media/recent
        'instagram' : {
            'base_url'          : 'http://10.0.5.28:3434',
            'client_id'         : 'qH1zLp5MPVmdWx',
            'client_secret'     : '645weLVaB6wc6d6eZzkJ4cf',
            'grant_type'        : 'authorization_code',
            'auth_uri'          : '/instagram/oauth/authorize',
            'grant_uri'         : '/instagram/oauth/access_token',
            'redirect_uri'      : 'http://10.0.5.32:3000/auth/instagram/callback',
        },
    },
    'production': {
        // Profile: /324826532457/?fields=engagement,talking_about_count,username
        // Feed: /324826532457/posts/?fields=message,picture,shares,created_time&limit=10
        'facebook' : {
            'base_url'          : 'https://graph.facebook.com',
            'client_id'         : '1570629509897630', // your App ID
            'client_secret'     : '87c1c7b8307b5fe0a6c33c59b6dfb544', // your App Secret
            'grant_type'        : 'client_credentials',
            'grant_uri'         : '/oauth/access_token',
        },
        // Profile: /1.1/users/show.json?screen_name=airbnb
        // Feed: /1.1/statuses/user_timeline.json?count=40&exclude_replies=true&include_rts=false&screen_name=airbnb
        'twitter' : {
            'base_url'          : 'https://api.twitter.com',
            'client_id'         : 'bk9usrOLdBAPBMEqLftT3vjsY',
            'client_secret'     : 'VXl7rpxvfItlWDhfizJrHqvJzS0hmlay49ysgMW8Ogy7Glw3ZH',
            'grant_type'        : 'client_credentials',
            'grant_uri'         : '/oauth2/token',
        },
        // Profile: /v1/users/airbnb?fields=counts,username
        'pinterest' : {
            'base_url'          : 'https://api.pinterest.com',
            'client_id'         : '4840937341203786780',
            'client_secret'     : 'de387849860279bde295c31297be1e47326e0ccef8f94c8069738e58b0595444',
            'grant_type'        : 'authorization_code',
            'auth_uri'          : '/oauth',
            'grant_uri'         : '/v1/oauth/token',
            'redirect_uri'      : 'https://airbnb.tlmworks.org/auth/pinterest/callback',
    	    'rss_feed_url'      : 'https://pinterest.com/airbnb/feed.rss'
        },
        // Profile: /v1/users/282399208
        // Feed: /v1/users/282399208/media/recent/
        'instagram' : {
            'base_url'          : 'https://api.instagram.com',
            'client_id'         : 'e0aa67fc97464bc7ac6baffdc7766eea',
            'client_secret'     : '990c99999fc241aeb46a488ed9cf53fd',
            'grant_type'        : 'authorization_code',
            'auth_uri'          : '/oauth/authorize',
            'grant_uri'         : '/oauth/access_token',
            'redirect_uri'      : 'https://airbnb.tlmworks.org/auth/instagram/callback',
        },
    }
};
