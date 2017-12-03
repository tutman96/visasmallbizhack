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
var gmaps_service_1 = require("../services/gmaps.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var api_service_1 = require("../services/api.service");
var NewMapComponent = (function () {
    function NewMapComponent(mapApi, apiService, route, fb) {
        var _this = this;
        this.mapApi = mapApi;
        this.apiService = apiService;
        this.route = route;
        this.fb = fb;
        this.visaData = null;
        this.salesYoY = true;
        this.transYoY = true;
        this.getData = function () {
            var service = new google.maps.places.PlacesService(_this.map);
            // this.mapApi.getZipInfo('30307').subscribe(
            //   (response) => {
            //     this.map.setCenter(response.geometry.location);
            //     this.map.fitBounds(response.geometry.bounds);
            //     service.nearbySearch({
            //       location: response.geometry.location,
            //       radius: 2500,
            //       keyword: 'Chinese',
            //       type: ['establishment']
            //     }, (data) => {
            //       this.setMarkers(data);
            //       this.heatMap(data);
            //     });
            //   });
        };
        this.setupLayers = function () {
            _this.map = new google.maps.Map(document.getElementById('googleMap'), {
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            _this.heatmap = new google.maps.visualization.HeatmapLayer({
                opacity: 0.2,
                radius: 1,
                dissipating: true,
                map: null
            });
        };
        this.setMarkers = function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.createMarkers(results[i]);
            }
        };
        this.createMarkers = function (place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: _this.map,
                position: place.geometry.location
            });
        };
        this.heatMap = function (data) {
            var heatmapData = [];
            for (var i = 0; i < data.length; i++) {
                heatmapData.push(data[i].geometry.location);
            }
            _this.heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                opacity: 0.2,
                radius: 1,
                dissipating: false,
                map: _this.map
            });
        };
        this.getVisaData = function () {
            _this.apiService.getMeasurement('30307').subscribe(function (response) {
                _this.visaData = response;
            });
        };
        this.toggleSales = function (value) {
            _this.salesYoY = !_this.salesYoY;
        };
        this.toggleTrans = function (value) {
            _this.transYoY = !_this.transYoY;
        };
        this.searchForm = this.fb.group({
            business: ['', forms_1.Validators.required],
            zip: ['', forms_1.Validators.required],
            radius: ['']
        });
    }
    NewMapComponent.prototype.ngOnInit = function () {
        this.map = new google.maps.Map(document.getElementById('googleMap'), { mapTypeId: google.maps.MapTypeId.ROADMAP });
        this.getData();
        this.getVisaData();
    };
    return NewMapComponent;
}());
__decorate([
    core_1.ViewChild('map'),
    __metadata("design:type", core_1.ElementRef)
], NewMapComponent.prototype, "mapel", void 0);
NewMapComponent = __decorate([
    core_1.Component({
        selector: 'app-map-api',
        templateUrl: './new-map.component.html',
        styleUrls: ['./new-map.component.css']
    }),
    __metadata("design:paramtypes", [gmaps_service_1.GmapsService,
        api_service_1.ApiService,
        router_1.ActivatedRoute,
        forms_1.FormBuilder])
], NewMapComponent);
exports.NewMapComponent = NewMapComponent;
//# sourceMappingURL=new-map.component.js.map