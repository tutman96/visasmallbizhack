import request = require('request');
var config = require('../config/configuration.json');

export interface WalkScoreResponse {
	
}

var apiKey = config.walkApiKey;

export function getWalkScore(latLong: { lat: number, long: number }) {
	return new Promise<number>((resolve, reject) => {
		request({
			uri: "http://api.walkscore.com/score",
			qs: {
				format: "json",
				lat: latLong.lat,
				long: latLong.long,
				transit: 1,
				bike: 1,
				wsapikey: apiKey
			},
			method: "GET"
		}, (err, response, body) => {
			if (err) reject(err);
			else resolve(JSON.parse(body).status);
		})
	})
}