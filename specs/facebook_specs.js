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

var api 				= request(app);


// FACEBOOK -----------------------------
describe('GET /connect/facebook/access-token - acquires a facebook token', function() {
	it('should request a token and return a json object with the token', function(done) {
		api
			.get('/connect/facebook/access-token')
			.end(function(err, res) {
				expect(res.status).to.eql(200);
				expect(res.headers['content-type']).to.eql('application/json; charset=utf-8')
			})
	})
})