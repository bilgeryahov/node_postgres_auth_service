/**
 * @file router.js
 *
 * Router of the API.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Code Ninjas, all rights reserved.
 */

'use strict';

// Development dependencies.
const express = require('express');
const router = express.Router();

// Controller with functions.
const usersController = require('./users.controller');

// Register a new user.
router
	.route('/users/register')
	.post(usersController.register);

// Login an existing user.
router
	.route('/users/login')
	.post(usersController.login);

// Export the router.
module.exports = router;