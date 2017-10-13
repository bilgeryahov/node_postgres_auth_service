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

module.exports = {

	register(){


	},

	login(){


	}
};