var request 		= require('supertest');
var expect 			= require('chai').expect;
var assert 			= require('chai').assert;
var User 				= require('../models/user');
var express 		= require('express');
var bodyParser 	= require('body-parser');

// db models
var User 				= require('../models/user');

var app 				= require('../server');
app.use(bodyParser.urlencoded({ extended: true }));


passportStub 		= require('passport-stub')
passportStub.install(app)
var api 				= request(app);


// HOMEPAGE
describe('GET /home', function() {
	it('should return status 200', function(done) {
		api
			.get('/')
			.expect(200, done)
	})
})

// SIGNUP
describe('GET /signup', function() {
	it('should return status 200', function(done) {
		api
			.get('/signup')
			.expect(200, done)
	})
})

describe('POST /signup', function() {
	it('should return a json object', function(done) {
		var data = {name: 's', email: 's@s.com', password: 's', admin: true };

		api
			.post('/signup')
			.type('application/x-www-form-urlencoded')
			.send(data)
			.expect('content-Type', /json/)
			.expect(200, done)
	})
})

// LOGIN / LOGOUT
describe('POST /login', function() {
	it('should redirect to /dashboard for authenticated user', function(done) {
		passportStub.login({username: 's@s.com'});

		api
			.post('/login')
			.expect('Location', '/dashboard')
			.expect(302, done)
	})
	it('should fail login and redirect to / for unauthenticated user', function(done) {
		passportStub.login({username: 'p@p.com'});

		api
			.post('/login')
			.expect('Location', '/')
			.expect(302, done)
	})
})

describe('GET /logout', function() {
	it('should redirect to / on successful logout', function(done) {
		api
			.get('/logout')
			.expect('Location', '/')
			.expect(302, done)
	})
})

