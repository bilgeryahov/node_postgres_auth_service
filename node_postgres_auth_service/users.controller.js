/**
 * @file users.controller.js
 *
 * Exposes controller functions for user handling. Such as
 * Login, Register.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Code Ninjas, all rights reserved.
 */

'use strict';

// Dependencies for proper functioning of the service.
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// Set up all the configurations.
const promise = require('bluebird');
const options = {
	promiseLib: promise
};
const pgPromise = require('pg-promise')(options);
const connectionConfig = {
	host: 'localhost', // server name or IP address;
	port: 5432,
	database: 'usersdb',
	user: 'postgres',
	password: '123456'
};
const dbInstance = pgPromise(connectionConfig);
const tableName = 'users';

module.exports = {

	/**
	 * Registers a single user.
	 *
	 * @param req
	 * @param res
	 *
	 * @return void
	 */

	register(req, res){

		// Check if all fields are present.
		if(!req.body.email || !req.body.first_name ||
			!req.body.last_name || !req.body.pass){

			res
				.status(400)
				.json({
					message: 'email, first_name, last_name and pass are required!'
				});
			return;
		}

		// All fields are present, go ahead!
		console.log('Registering a new user!');

		let rawPass = req.body.pass;

		// All the attributes are named the same way as in the database.
		let email       = req.body.email;
		let first_name  = req.body.first_name;
		let last_name   = req.body.last_name;
		let pass        = bcrypt.hashSync(rawPass, bcrypt.genSaltSync(10));

		let query =  `INSERT INTO ${tableName} (email, first_name, last_name, pass)`;
			query += ` VALUES ('${email}', '${first_name}', '${last_name}', '${pass}');`;

		dbInstance.none(query)
			.then(function () {

				console.log('User created!');
				res
					.status(201)
					.json({
						message: 'User created!'
					});
			})
			.catch(function (error) {

				// Log the error and return it as a message as well.
				console.log(error);
				res
					.status(400)
					.json(error);
			});
	},

	/**
	 * Attempts to login a single user based on email and pass.
	 *
	 * @param req
	 * @param res
	 *
	 * @return void
	 */

	login(req, res){

		// Check if all fields are present.
		if(!req.body.email || !req.body.pass){

			res
				.status(400)
				.json({
					message: 'email, and pass are required!'
				});
			return;
		}

		// All fields are present, go ahead!
		console.log('Attempting to login a user!');

		let email = req.body.email;
		let pass = req.body.pass;

		let query = `SELECT * \nFROM ${tableName}`;
		query    += `\nWHERE email = '${email}';`;

		dbInstance.one(query)
			.then(function (data) {

				/*
				 * Found the user.
				 * Check if the password matches.
				 */

				if(bcrypt.compareSync(pass, data.pass)){
					let token = jwt.sign({email: data.email}, 's3cr3t', {expiresIn: 3600});

					console.log('User found ', data.email);
					res
						.status(200)
						.json({message: 'Login successful', token: token});
					return;
				}

				console.log('Password does not match.');
				res
					.status(401)
					.json({message: 'Unauthorized'});
			})
			.catch(function (error) {

				if(error.message && error.message === 'No data returned from the query.'){

					console.log('User does not exist!');
					res
						.status(400)
						.json({
							message: 'User does not exist!'
						});
					return;
				}

				// Log the error and return it as a message as well.
				console.log(error);
				res
					.status(400)
					.json(error);
			});
	}
};