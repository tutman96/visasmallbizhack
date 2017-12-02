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

import VisaClient = require('./library/visawebapi');

app.get("/api/visa/merchant-measurement", async (req, res) => {
	let response = await VisaClient.post("merchantmeasurement/v1/merchantbenchmark", {
		"requestData": {
			"naicsCodes": [
				""
			],
			"merchantCategoryCodes": [
				"Fast Food Restaurants"
			],
			"merchantCategoryGroupsCodes": [
				""
			],
			"merchantCountry": "840",
			"postalCodeList": [
				""
			],
			"msaList": [
				"7362"
			],
			"countrySubdivisionList": [
				""
			],
			"monthList": [
				"201706"
			],
			"cardPresentIndicator": "CARDPRESENT",
			"accountFundingSource": [
				"All"
			],
			"eciIndicator": [
				"All"
			],
			"platformID": [
				"All"
			],
			"posEntryMode": [
				"All"
			],
			"groupList": [
				"standard",
				"cardholder",
				"cbreasoncode"
			]
		}
	})
	
	res.json(response);
})

app.listen(8080, () => {
	console.log("Express app listening on port 8080");
})