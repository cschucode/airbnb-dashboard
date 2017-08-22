// CONTROLLERS
var mainCont    = require('../controllers/mainCont');
var localCont   = require('../controllers/localCont');
var userCont    = require('../controllers/userCont');
var serviceCont = require('../controllers/serviceCont');
var accountCont = require('../controllers/accountCont');

// OBSERVERS
var Twitter     = require('../observer/twitter');
var Facebook    = require('../observer/facebook');
var Instagram   = require('../observer/instagram');
var Pinterest   = require('../observer/pinterest');

// ERROR LOGGER
var log         = require('winston');


module.exports = function(app, passport) {
    app.use(localCont.paths); // middleware that extracts res.locals.paths

    app.get('/', mainCont.getDashboard); // show login form

    app.get('/signup', rerouteToDashboard, mainCont.getSignup); // show signup form
    app.post('/signup', rerouteToDashboard, mainCont.postSignup); // process the signup form


    app.post('/login', rerouteToDashboard, mainCont.postLogin); // process the login form
    app.get('/logout', rerouteToDashboard, mainCont.getLogout); // process logout

    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/dashboard', isLoggedIn, mainCont.getDashboard);
    
// ADMIN INTERFACE ---------------------------------
    // USERS
    app.get('/admin', isLoggedIn, isAdmin, serviceCont.getServices);

    app.get('/admin/users', isLoggedIn, isAdmin, userCont.getUsers);
    app.post('/users', isLoggedIn, isAdmin, userCont.postUser);
    app.get('/users/delete/:id', isLoggedIn, isAdmin, userCont.deleteUser);

    // SERVICES
    app.get('/admin/services', isLoggedIn, isAdmin, serviceCont.getServices);
    app.post('/services', isLoggedIn, isAdmin, serviceCont.postService);
    app.get('/services/delete/:id', isLoggedIn, isAdmin, serviceCont.deleteService);

    // ACCOUNTS
    app.get('/admin/accounts', isLoggedIn, isAdmin, accountCont.getAccounts);
    app.post('/accounts', isLoggedIn, isAdmin, accountCont.postAccount);
    app.get('/accounts/delete/:id', isLoggedIn, isAdmin, accountCont.deleteAccount);


// API INTERFACE ------------------------------------
    // FACEBOOK
    app.get('/facebook/access-token', isLoggedIn, isAdmin, Facebook.getToken);
    app.get('/facebook/profile/:id', isLoggedIn, isAdmin, Facebook.getProfile); 
    app.get('/facebook/recent-feeds/:id', isLoggedIn, isAdmin, Facebook.getRecentFeeds); 


    // TWITTER
    app.get('/twitter/access-token', isLoggedIn, isAdmin, Twitter.getToken); 
    app.get('/twitter/profile/:id', isLoggedIn, isAdmin, Twitter.getProfile); 
    app.get('/twitter/recent-feeds/:id', isLoggedIn, isAdmin, Twitter.getRecentFeeds); 


    // // INSTAGRAM
    app.get('/instagram/access-token', isLoggedIn, isAdmin, Instagram.getGrantCode); 
    app.get('/auth/instagram/callback', isLoggedIn, isAdmin, Instagram.getToken);
    app.get('/instagram/profile/:id', isLoggedIn, isAdmin, Instagram.getProfile);
    app.get('/instagram/recent-feeds/:id', isLoggedIn, isAdmin, Instagram.getRecentFeeds); 


    // // PINTEREST
    app.get('/pinterest/access-token', isLoggedIn, isAdmin, Pinterest.getGrantCode); 
    app.get('/auth/pinterest/callback', isLoggedIn, isAdmin, Pinterest.getToken);
    app.get('/pinterest/profile/:id', isLoggedIn, isAdmin, Pinterest.getProfile);
    app.get('/pinterest/recent-feeds/:id', isLoggedIn, isAdmin, Pinterest.getRssFeed); 


    // DASHBOARD ENDPOINTS --------------------------------------
    app.get('/dashboard', isLoggedIn, mainCont.getDashboard);
    app.get('/:service/:account/profile', isAdmin, isLoggedIn, mainCont.getDashProfile); // in form of /twitter/airbnb/profile


    // ERROR HANDLER
    app.use(function(err, req, res, next) {
        if (err) {
            if (process.env.NODE_ENV === 'production') {
                log.error('Error thrown.', err.message.trim());
            } else {
                log.error('Error thrown.', err.stack.trim());
            }
        }
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    return next();
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

// check if user is an admin, adds extra functionality, like adding users and updating 
// api configs. Should be placed after isLoggedIn
function isAdmin(req, res, next) {
    res.locals.admin = true; // need to get rid of these 2 lines in production
    return next();
    if (req.user.admin) {
        res.locals.admin = req.user.admin;
        return next();
    }
    res.redirect('/');
}

// reroute passed login for phase 1
function rerouteToDashboard(req, res, next) {
    return res.redirect('/dashboard');
}
