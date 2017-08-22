// use 'twitter', 'facebook', 'pinterest', 'instagram' as first-level values

module.exports = {
// Profile
// /324826532457/?fields=engagement,talking_about_count,username

//Feeds
// 324826532457/posts/?fields=message,picture,shares,created_time&limit=10

    'facebook' : {
        'base_url'          : 'https://graph.facebook.com',
        'client_id'         : '1570629509897630', // your App ID
        'client_secret'     : '87c1c7b8307b5fe0a6c33c59b6dfb544', // your App Secret
        'grant_type'        : 'client_credentials',
        'grant_uri'         : '/oauth/access_token',
    },

// profile
// /1.1/users/show.json?screen_name=airbnb

// Feed
// /1.1/statuses/user_timeline.json?count=40&exclude_replies=true&include_rts=false&screen_name=airbnb
    'twitter' : {
        'base_url'          : 'https://api.twitter.com',
        'client_id'         : 'bk9usrOLdBAPBMEqLftT3vjsY',
        'client_secret'     : 'VXl7rpxvfItlWDhfizJrHqvJzS0hmlay49ysgMW8Ogy7Glw3ZH',
        'grant_type'        : 'client_credentials',
        'grant_uri'         : '/oauth2/token',
    },
// profile
// /v1/users/airbnb?fields=counts,username

    'pinterest' : {
        'base_url'          : 'https://api.pinterest.com',
        'client_id'         : '4840937341203786780',
        'client_secret'     : 'de387849860279bde295c31297be1e47326e0ccef8f94c8069738e58b0595444',
        'grant_type'        : 'authorization_code',
        'auth_uri'          : '/oauth',
        'grant_uri'         : '/v1/oauth/token',
        'redirect_uri'      : 'http://localhost:3000/auth/pinterest/callback',
    },
// /v1/users/282399208 profile URI
// /v1/users/282399208/media/recent/ Feed Uri

    'instagram' : {
        'base_url'          : 'https://api.instagram.com',
        'client_id'         : 'e0aa67fc97464bc7ac6baffdc7766eea',
        'client_secret'     : '990c99999fc241aeb46a488ed9cf53fd',
        'grant_type'        : 'authorization_code',
        'auth_uri'          : '/oauth/authorize',
        'grant_uri'         : '/oauth/access_token',
        'redirect_uri'      : 'https://localhost:3000/auth/instagram/callback',
    },
};
