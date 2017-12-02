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
var GmapsService = (function () {
    function GmapsService(http) {
        var _this = this;
        this.http = http;
        this.apikey = environment_1.environment.gapikey;
        this.addKey = function (query) {
            return "https://maps.googleapis.com/maps/api" + query + "&key=" + _this.apikey;
        };
        this.getPlaces = function () {
            return _this.http.get(_this.addKey("/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise"));
        };
    }
    return GmapsService;
}());
GmapsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], GmapsService);
exports.GmapsService = GmapsService;
//# sourceMappingURL=gmaps.service.js.map