'use strict';

let winston = require('winston');

winston.clear()
let logger = new winston.logger({
	transports: [
		new winston.transports.Console({
			level: process.env.CONSOLE_LOGGING_LEVEL || 'info',
			json: false,
			handleExceptions: true,
			colorize: true
		}),
		new winston.transports.File({
			level: process.env.FILE_LOGGING_LEVEL || 'info',
			json: false,
			handleExceptions: true,
			filename: process.env.FILE_LOGGING_NAME
		})
	]
})

module.exports = logger;