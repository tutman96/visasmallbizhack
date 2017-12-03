"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var config = require('../config/configuration.json');
var apiKey = config.walkApiKey;
function getWalkScore(latLong) {
    return new Promise(function (resolve, reject) {
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
        }, function (err, response, body) {
            if (err)
                reject(err);
            else
                resolve(JSON.parse(body).status);
        });
    });
}
exports.getWalkScore = getWalkScore;
//# sourceMappingURL=walkscore.js.map