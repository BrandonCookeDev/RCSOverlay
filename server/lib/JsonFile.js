'use strict';

const fs = require('fs');
const _  = require('lodash');

class JsonFile{
	
	static read(){
		console.debug('JsonFile.read called');
		try{
			let content = fs.readFileSync(process.env.JSON_FILEPATH, 'utf8');
			let obj = JSON.parse(content);
			return obj;
		} catch(e){
			console.error('JsonFile.read error: %s', e);
			throw e;
		}
	}

	static get(property){
		console.debug('JsonFile.get called [%s]', property);
		try{
			let obj = JsonFile.read();
			if(obj.hasOwnProperty(property))
				return obj[property];
			else{
				console.warning('Json document does not have property %s', property);
				return null;
			}
		} catch(e){
			console.error('JsonFile.get error: %s', e);
			throw e;
		}
	}

	static update(property, value){
		console.debug('JsonFile.update called [%s] [%s]', property, value);
		try{
			let obj = JsonFile.read();
			if(obj.hasOwnProperty(property)){
				obj[property] = value;
				console.info('Json document updated at property %s', property);
			}
			else
				console.warning('Json document does not have property %s', property);

			JsonFile.write(obj);
		} catch(e){
			console.error('JsonFile.update error: %s', e);
			throw e;
		}
	}

	static write(content){
		console.debug('JsonFile.write called');
		try{
			let cur = JsonFile.read();
			let newObj = _.assign(cur, content);
			fs.writeFileSync(process.env.JSON_FILEPATH, JSON.stringify(newObj, null, 4), 'utf8');
			return content;
		} catch(e){
			console.error('JsonFile.write error: %s', e);
			throw e;
		}
	}
}

module.exports = JsonFile;