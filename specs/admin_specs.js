var request 		= require('supertest');
var expect 			= require('chai').expect;
var assert 			= require('chai').assert;
var User 				= require('../models/user');
var express 		= require('express');
var bodyParser 	= require('body-parser');

// db models
var User 				= require('../models/user');
var Service			= require('../models/service');
var Account			= require('../models/account');

var mongoose 			= require('mongoose');
var ObjectId 			= mongoose.Types.ObjectId;

var app 				= require('../server');
app.use(bodyParser.urlencoded({ extended: true }));


passportStub 		= require('passport-stub')
passportStub.install(app)
var api 				= request(app);


// USERS --------------------------------------
describe('GET /users', function() {
	it('should return status 200', function(done) {
		api
			.get('/users')
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				done();
			})
	})
	it('should return JSON', function(done) {
		api
			.get('/users')
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done();
			})
	})
})

describe('POST /users', function() {
	var data = {name: 'test', email: 'test@test.com', password: 'test', admin: false};

	it('should return status 200', function(done) {
		api
			.post('/users')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				User.findOneAndRemove({email: 'test@test.com'}).exec();
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.post('/users')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				User.findOneAndRemove({email: 'test@test.com'}).exec();
				done();
			})
	})
})

describe('DELETE /users/:id', function() {
	var data = {name: 'test', email: 'test@test.com', password: 'test', admin: false};
	var id;

	beforeEach(function(done) {

		User.create(data, function(err, user) {
			id = user._id;
			done();
		});
	})


	it('should return status 200', function(done) {
		api
			.delete('/users/' + id)
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.delete('/users/' + id)
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done();
			})
	})
})


// SERVICES -------------------------------------------
describe('GET /services', function() {
	before(function(done) {
		var data = {service_name: 'test'}
		Service.create(data, function(err, service) {
			done();
		})
	})
	after(function(done) {
		Service.remove({service_name: 'test'}, function(err, service) {
			done();
		})
	})

	it('should return status 200', function(done) {
		api
			.get('/services')
			.end(function(err, res) {
				expect(res.status).to.eql(200)
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.get('/services')
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done();
			})
	})
})

describe('POST /services', function() {
	var data = {service_name: 'test'}

	it('should return status 200', function(done) {
		api
			.post('/services')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				Service.findOneAndRemove({service_name: 'test'}).exec();
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.post('/services')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				Service.findOneAndRemove({service_name: 'test'}).exec()
				done();
			})
	})
})

describe('DELETE /services/:id', function() {
	var data = {service_name: 'test'}
	var id;

	beforeEach(function(done) {
		Service.create(data, function(err, service) {
			id = service._id;
			done();
		})
	})

	it('should return status 200', function(done) {
		api
			.delete('/services/' + id)
			.end(function(err, res) {
				expect(res.status).to.eql(200)
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.delete('/services/' + id)
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done();
		})
	})
})


// ACCOUNTS -------------------------------------
describe('GET /accounts', function() {
	var id;

	before(function(done) {
		Service.create({service_name: 'test'}, function(err, service) {
			id = service._id;
			done();
		})
	})

	before(function(done) {
		var data = {account_name: 'test', service_name: id, service: 'test', profile_uri: 'test', feed_uri: 'test', country: 'test'};
		Account.create(data, function(err, account) {
			done();
		})
	})
	after(function(done) {
		Account.remove({account_name: 'test'}, function(err, account) {
			done();
		})
	})

	after(function(done) {
		Service.remove({service_name: 'test'}, function(err, service) {
			done();
		})
	})

	it('should return status 200', function(done) {
		api
			.get('/accounts')
			.end(function(err, res) {
				expect(res.status).to.eql(200)
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.get('/accounts')
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done()
			})
	})
})

describe('POST /accounts', function() {
	var data = {account_name: 'test', service_name: 'test', service: 'test', profile_uri: 'test', feed_uri: 'test', country: 'test'};

	before(function(done) {
		Service.create({service_name: 'test'}, function(err, service) {
			done();
		})
	})

	after(function(done) {
		Service.remove({service_name: 'test'}, function(err, service) {
			done();
		})
	})
	afterEach(function(done) {
		Account.findOneAndRemove({account_name: 'test'}).exec(function(err, account) {
			done();
		});
	})

	it('should return status 200', function(done) {
		api
			.post('/accounts')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.post('/accounts')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done();
			})
	})
})

describe('DELETE /accounts/:id', function() {
	var data = {account_name: 'test', service: 'test', profile_uri: 'test', feed_uri: 'test', country: 'test'};
	var accountId;

	beforeEach(function(done) {
		Service.create({service_name: 'test'}, function(err, service) {
			data.service_name = new ObjectId(service._id);
			Account.create(data, function(err, account) {
				accountId = account._id;
				done();
			})
		})
	})

	afterEach(function(done) {
		Service.findOneAndRemove({service_name: 'test'}, function(err, service) {
			done();
		})
	})

	it('should return status 200', function(done) {
		api
			.delete('/accounts/' + accountId)
			.end(function(err, res) {
				expect(res.status).to.eql(200)
				done();
			})
	})
	it('should return a json object', function(done) {
		api
			.delete('/accounts/' + accountId)
			.end(function(err, res) {
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
				done();
			})
	})
})