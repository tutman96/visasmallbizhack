import express = require('express');
import winston = require('winston');
import expressWinston = require('express-winston');

var app = express();
// app.use(expressWinston.logger({
// 	transports: [
// 		new winston.transports.Console({
// 			json: true,
// 			colorize: true
// 		})
// 	],
// 	msg: "HTTP {{req.method}} {{req.url}}",
// 	expressFormat: true,
// 	colorize: true,
// }));

const asyncMiddleware = fn =>
	(req, res, next) => {
		Promise.resolve(fn(req, res, next))
			.catch(next);
	};

import merchantMeasurement = require('./services/merchant-measurement');

app.get("/api/visa/merchant-measurement", asyncMiddleware(async (req, res) => {
	var zipCode = req.query['zip'];
	if (!zipCode) throw new Error("Zip query not provided");

	var measurement = await merchantMeasurement.getMeasurementByZipcode(zipCode);

	res.json(measurement);
}))

import depositRate = require('./services/deposit-rates');

app.get("/api/usbank/deposit-rates", asyncMiddleware(async (req, res) => {
	var balance = req.query['balance'];
	var loanAmount = req.query['loanAmount'];
	var term = req.query['term'];
	var zipcode = req.query['zipcode'];

	if (!balance) throw new Error("Balance query not provided");
	if (!loanAmount) throw new Error("Loan amount query not provided");
	if (!term) throw new Error("Term query not provided");
	if (!zipcode) throw new Error("Zipcode query not provided");

	var rate = await depositRate.getCurrentDepositRates(balance, loanAmount, term, zipcode);

	res.json(rate);
}))

import walkScore = require('./services/walkscore');

app.get("/api/walkscore", asyncMiddleware(async (req, res) => {
	var lat = req.query['lat'];
	var long = req.query['long'];
	if (!lat || !long) throw new Error("Lat and long not provided");

	var score = await walkScore.getWalkScore({ lat, long });
	
	res.json({
		score
	});
}))

// app.use(expressWinston.errorLogger({
// 	transports: [
// 		new winston.transports.Console({
// 			json: true,
// 			colorize: true
// 		})
// 	]
// }));
app.listen(8080, () => {
	console.log("Express app listening on port 8080");
})