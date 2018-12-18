'use strict';

const PORT = 8081;
const path = require('path');
let express = require('express');
let chalk = require('chalk');
let app = express();

process.env.JSON_FILEPATH = path.join(__dirname, 'data.json');
let routes = require('./lib/endpoints');

app.use(require('cors')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded());
app.use(require('compression')());
app.use('/api', routes);

app.listen(PORT, function(err){
	if(err){
		console.error(err);
		process.exit(1);
	}
	console.log('Server listening on port %s', chalk.blue(PORT));
});