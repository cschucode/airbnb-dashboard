// MODELS
var Service 	= require('bluebird').promisifyAll(require('../models/service'));

// AUTH CONFIGS
var configs 	= require('../config/auth.js')[process.env.NODE_ENV];


exports.getServices = function(req, res, next) {
	// gets and returns all services, rendering services page
	Service.find({}).execAsync()
		.then(function(services) {
			var configsServices = Object.keys(configs); // gets services listing from auth.js keys
			res.render('services', { services: services, page: 'services', configuredServices: configsServices })
			// res.status(200).render('services', services)
		})
		.catch(function(err) {
			return next(err);
		})
};

exports.postService = function(req, res, next) {
	// creates a service and redirects back to services pages
	Service.findById(req.body.id).execAsync()
		.then(function(service) {
			if (!service) {
				var newService 						= new Service();
				newService.service_name 	= req.body.service_name;
				newService.client_id 			= configs[req.body.service_name].client_id;

				return newService.save();
			}
		})
		.then(function(service) {
			res.redirect('/admin/services');
		})
		.catch(function(err) {
			return next(err);
		})

}

exports.deleteService = function(req, res, next) {
	// deletes a single service and redirects back to services page
	Service.findById(req.params.id).execAsync()
		.then(function(service) {
			return service.remove();
		})
		.then(function(service) {
			res.redirect('/admin/services');
		})
		.catch(function(err) {
			return next(err);
		})
}