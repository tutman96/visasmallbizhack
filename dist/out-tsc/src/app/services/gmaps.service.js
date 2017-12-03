"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
var GmapsService = (function () {
    function GmapsService(http) {
        var _this = this;
        this.http = http;
        this.apikey = environment_1.environment.gapikey;
        this.addKey = function (query) {
            return "https://maps.googleapis.com/maps/api" + query + "&key=" + _this.apikey;
        };
        this.setMap = function (map) {
            _this.map = map;
            _this.service = new google.maps.places.PlacesService(_this.map);
        };
        this.loadZipcodeGeometry = function (zip) {
            var geocoder = new google.maps.Geocoder();
            return Observable_1.Observable.create(function (observer) {
                geocoder.geocode({ address: zip }, function (geocoderResult, status) {
                    _this.zipcodeGeometry = geocoderResult[0].geometry;
                    _this.zipcodeName = geocoderResult[0].formatted_address;
                    observer.next(_this.zipcodeGeometry);
                });
            });
        };
        this.loadPlaces = function (searchTerm) {
            return Observable_1.Observable.create(function (observer) {
                if (_this.zipcodeGeometry == null)
                    throw new Error("zipcodeGeometry is null. call loadZipcodeGeometry");
                if (_this.map == null)
                    throw new Error("map is null. call setMap");
                _this.placesInfo = [];
                console.log("searchTerm", searchTerm);
                _this.service.nearbySearch({
                    location: _this.zipcodeGeometry.location,
                    radius: 2500,
                    keyword: searchTerm,
                    type: ['restaurant']
                }, function (results, status, pagination) {
                    _this.placesInfo = _this.placesInfo.concat(results);
                    if (pagination.hasNextPage && _this.placesInfo.length < 40) {
                        console.log("new page", _this.placesInfo);
                        pagination.nextPage();
                    }
                    else {
                        console.log("done", _this.placesInfo);
                        observer.next(_this.placesInfo);
                    }
                });
            });
        };
    }
    GmapsService.prototype.getTopPlaces = function (num) {
        if (num === void 0) { num = 3; }
        if (this.placesInfo == null)
            throw new Error("placesInfo is null. call loadPlaces");
        var avg = this.placesInfo.reduce(function (total, place) { return place.rating != null ? total + place.rating : total; }, 0) / this.placesInfo.length;
        return {
            total: this.placesInfo.length,
            places: this.placesInfo.slice(0, num),
            averageRating: this.roundTo(avg, 2)
        };
    };
    GmapsService.prototype.roundTo = function (n, digits) {
        var negative = false;
        if (digits === undefined) {
            digits = 0;
        }
        if (n < 0) {
            negative = true;
            n = n * -1;
        }
        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
        n = (Math.round(n) / multiplicator).toFixed(2);
        if (negative) {
            n = (n * -1).toFixed(2);
        }
        return n;
    };
    return GmapsService;
}());
GmapsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], GmapsService);
exports.GmapsService = GmapsService;
//# sourceMappingURL=gmaps.service.js.map