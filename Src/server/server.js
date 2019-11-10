'use strict';

const err = e => {
	console.error('UNHANDLED:');
	console.error(e);
	process.exit(1);
}
process.on('error', err);
process.on('uncaughtException', err);
process.on('unhandledRejection', err);

const path = require('path');
let express = require('express');
let chalk = require('chalk');
let app = express();

const PORT = 8081;
const ROOT = path.join(__dirname, '..');
const TEST_FILE = path.join(__dirname, 'data.json');
const STREAM_CONTROL = path.join(ROOT, '..', 'StreamControl_0_4b')
const PROD_FILE = path.join(STREAM_CONTROL, 'streamcontrol.json');
process.env.JSON_FILEPATH = PROD_FILE;
let routes = require('./lib/endpoints');

app.use(require('cors')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded());
app.use(require('compression')());
app.use('/api', routes);

app.use(express.static(ROOT));

app.listen(PORT, function(err){
	if(err){
		console.error(err);
		process.exit(1);
	}
	console.log('Server listening on port %s', chalk.blue(PORT));
});