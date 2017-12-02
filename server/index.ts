import express = require('express');
import winston = require('winston');
import expressWinston = require('express-winston');

var app = express();
app.use(expressWinston.logger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true
		})
	],
	msg: "HTTP {{req.method}} {{req.url}}",
	expressFormat: true,
	colorize: true,
}));

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

app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true
		})
	]
}));
app.listen(8080, () => {
	console.log("Express app listening on port 8080");
})