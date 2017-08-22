// MODELS
var User = require('bluebird').promisifyAll(require('../models/user'));


exports.getUsers = function(req, res, next) {
	// get and return all users to users page
	User.find({}).execAsync()
		.then(function(users) {
			res.render('users', {users: users, page: 'users'})
		})
		.catch(function(err) {
			return next(err);
		})
};

exports.postUser = function(req, res, next) {
	// modify/create new users, then redirect to users page
	User.findById(req.body._id).execAsync()
		.then(function(user) {
			if (user) { // if user exists, update
				user.name 						= req.body.name;
				user.email 						= req.body.email;
				user.password 				= user.generateHash(req.body.password);
				user.admin 						= req.body.admin;
				return user.save();
			}
			// else user doesn't exist, so create it
		  var newUser 					= new User();
		  newUser.name 					= req.body.name;
		  newUser.email 				= req.body.email;
		  newUser.password 			= newUser.generateHash(req.body.password);
		  newUser.admin 				= req.body.admin;
		  return newUser.save()
		})
		.then(function(user) {
			res.redirect('/admin/users');
		})
		.catch(function(err) {
			return next(err);
		})
};

exports.deleteUser = function(req, res, next) {
	// deletes a user and redirects to users page
	User.findById(req.params.id).execAsync()
		.then(function(user) {
			if (user) user.remove()
			res.redirect('/admin/users')
		})
		.catch(function(err) {
			return next(err);
		})
}