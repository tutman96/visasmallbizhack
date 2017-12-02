import request = require('request');
import fs = require('fs');
import crypto = require('crypto');
var config = require('../config/configuration.json');
import randomstring = require('randomstring');

function logRequest(requestBody, path) {
	console.log("URL : " + config.visaUrl + path);
	if (requestBody !== null && requestBody !== '') {
		console.log("Request Body : " + JSON.stringify(JSON.parse(requestBody),null,4));
	}
}

function logResponseBody(response, body) {
	console.log("Response Code: " + response.statusCode);
	console.log("Headers:");
	for(var item in response.headers) {
		console.log(item + ": " + response.headers[item]);
	}
	console.log("Body: "+ JSON.stringify(JSON.parse(body),null,4));
}

class VisaAPIClient {
	static async post<T>(path: string, requestBody: any): Promise<T> {
		requestBody = JSON.stringify(requestBody);
		
		var headers = {};
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
		headers['Authorization'] = 'Basic ' + new Buffer(config.userId + ':' + config.password).toString('base64');
		headers['ex-correlation-id'] = randomstring.generate({length:12, charset: 'alphanumeric'}) + '_SC'
		
		return new Promise<T>((resolve, reject) => {
			request({
				uri : config.visaUrl + path,
				key: config.key,
				method : "POST",
				cert: config.cert,
				headers: headers,
				body: requestBody,
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
export = VisaAPIClient;