/**
 * @file app.js
 *
 * Setting up the Express server.
 *
 * @author Bilger Yahov <bayahov1@gmail.com>
 * @version 1.0.0
 * @copyright © 2017 Code Ninjas, all rights reserved.
 */

'use strict';

const express    = require('express');
const path       = require('path');
const routes     = require('./routes');
const bodyParser = require('body-parser');

const app        = express();

app.set('port', 3000);

app.use(function(req, res, next){

	console.log(req.method, req.url);
	next();
});

app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Runs before API routes run. Extended is false,
// since we do need access to arrays and strings only.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', routes);

const server = app.listen(app.get('port'), function(){

	let port = server.address().port;
	console.log('Info: Server listening on port: ', port);
});