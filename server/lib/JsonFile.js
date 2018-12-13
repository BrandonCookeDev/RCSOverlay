'use strict';

const fs = require('fs');
const _  = require('lodash');
let log  = require('../util/Logger');

class JsonFile{
	
	static read(){
		log.debug('JsonFile.read called');
		try{
			let content = fs.readFileSync(process.env.JSON_FILEPATH, 'utf8');
			let obj = JSON.parse(obj);
			return obj;
		} catch(e){
			log.error('JsonFile.read error: %s', e);
			throw e;
		}
	}

	static write(content){
		log.debug('JsonFile.write called');
		try{
			let cur = JsonFile.read();
			let newObj = _.assign(cur, content);
			fs.writeFileSync(process.env.JSON_FILEPATH, JSON.stringify(newObj, null, 4), 'utf8');
			return content;
		} catch(e){
			log.error('JsonFile.write error: %s', e);
			throw e;
		}
	}
}

module.exports = JsonFile;