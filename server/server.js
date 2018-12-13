'use strict';

let express = require('express');
let app = express();

app.use(require('cors')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencode());
app.use(require('compression')());

const path = require('path');
process.env.JSON_FILEPATH = path.join(__dirname, 'data.json');

app.listen(8080, function(err){
	if(err){
		console.error(err);
		process.exit(1);
	}
	console.log('Server listening on port %s', chalk.blue(8080));
}) 