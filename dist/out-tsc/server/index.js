"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var winston = require("winston");
var expressWinston = require("express-winston");
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
var asyncMiddleware = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
};
var merchantMeasurement = require("./services/merchant-measurement");
app.get("/api/visa/merchant-measurement", asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var zipCode, measurement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                zipCode = req.query['zip'];
                if (!zipCode)
                    throw new Error("Zip query not provided");
                return [4 /*yield*/, merchantMeasurement.getMeasurementByZipcode(zipCode)];
            case 1:
                measurement = _a.sent();
                res.json(measurement);
                return [2 /*return*/];
        }
    });
}); }));
var depositRate = require("./services/deposit-rates");
app.get("/api/usbank/deposit-rates", asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var balance, loanAmount, term, zipcode, rate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                balance = req.query['balance'];
                loanAmount = req.query['loanAmount'];
                term = req.query['term'];
                zipcode = req.query['zipcode'];
                if (!balance)
                    throw new Error("Balance query not provided");
                if (!loanAmount)
                    throw new Error("Loan amount query not provided");
                if (!term)
                    throw new Error("Term query not provided");
                if (!zipcode)
                    throw new Error("Zipcode query not provided");
                return [4 /*yield*/, depositRate.getCurrentDepositRates(balance, loanAmount, term, zipcode)];
            case 1:
                rate = _a.sent();
                res.json(rate);
                return [2 /*return*/];
        }
    });
}); }));
var walkScore = require("./services/walkscore");
app.get("/api/walkscore", asyncMiddleware(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var lat, long, score;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lat = req.query['lat'];
                long = req.query['long'];
                if (!lat || !long)
                    throw new Error("Lat and long not provided");
                return [4 /*yield*/, walkScore.getWalkScore({ lat: lat, long: long })];
            case 1:
                score = _a.sent();
                res.json({
                    score: score
                });
                return [2 /*return*/];
        }
    });
}); }));
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));
app.listen(8080, function () {
    console.log("Express app listening on port 8080");
});
//# sourceMappingURL=index.js.map