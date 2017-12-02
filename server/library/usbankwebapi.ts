import request = require('request');
import fs = require('fs');
var config = require('../config/configuration.json');

function logRequest(path) {
	console.log("URL : " + config.usbankUrl + path);
}

function logResponseBody(response, body) {
	console.log("Response Code: " + response.statusCode);
	console.log("Headers:");
	for(var item in response.headers) {
		console.log(item + ": " + response.headers[item]);
	}
	console.log("Body: "+ JSON.stringify(JSON.parse(body),null,4));
}

class UsbankAPIClient {
	static async get<T>(path: string): Promise<T> {
		
		var headers = {};
		headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
        	
		return new Promise<T>((resolve, reject) => {
			request({
				uri : config.usbankUrl + path,
				method : "GET",
				headers: headers,
				timeout: 30000
			}, function(err, response, body) {
				if (err) {
					reject(err);
				} 
				else {
					resolve(JSON.parse(body));
				}
			});	
		})
	}
}
export = UsbankAPIClient;