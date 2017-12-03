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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var gmaps_service_1 = require("../services/gmaps.service");
var api_service_1 = require("../services/api.service");
var MapApiComponent = (function () {
    function MapApiComponent(mapApi, route, apiService, fb) {
        var _this = this;
        this.mapApi = mapApi;
        this.route = route;
        this.apiService = apiService;
        this.fb = fb;
        this.visaData = null;
        this.salesYoY = true;
        this.transYoY = true;
        this.averageRating = 10;
        this.test = 'test';
        this.getData = function () {
            _this.mapApi.loadZipcodeGeometry('30341').subscribe(function (zipGeometry) {
                _this.map.setCenter(zipGeometry.location);
                _this.map.fitBounds(zipGeometry.bounds);
                _this.mapApi.loadPlaces('chinese').subscribe(function (places) {
                    _this.getPlaceData();
                    _this.setMarkers(places);
                    _this.heatMap(places);
                });
            });
        };
        this.setMarkers = function (results) {
            results.forEach(function (place) {
                var marker = new google.maps.Marker({
                    map: _this.map,
                    position: place.geometry.location,
                    title: place.name,
                    icon: {
                        url: '/assets/pin.svg',
                        anchor: new google.maps.Point(15, 15)
                    }
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "<div id=\"content\">\n          <div id=\"siteNotice\"></div>\n          <h1 id=\"firstHeading\" class=\"popupHeading\">" + place.name + "</h1>\n          <div id=\"bodyContent\">\n            " + (place.rating != null ? "Rating: " + place.rating + "/5<br>" : "") + "\n            " + (place.price_level != null ? "$".repeat(place.price_level) : "") + "\n          </div>\n        </div>"
                });
                marker.addListener('click', function () {
                    if (_this.openInfoWindow)
                        _this.openInfoWindow.close();
                    _this.openInfoWindow = infowindow;
                    infowindow.open(_this.map, marker);
                });
            });
        };
        this.heatMap = function (data) {
            if (_this.heatmap)
                _this.heatmap.setMap(null);
            _this.heatmap = new google.maps.visualization.HeatmapLayer({
                data: data.map(function (d) { return d.geometry.location; }),
                opacity: 0.5,
                radius: 0.02,
                dissipating: false,
                map: _this.map
            });
            var gradient = [
                "rgba(102, 255, 0, 0)",
                "rgba(102, 255, 0, 1)",
                "rgba(147, 255, 0, 1)",
                "rgba(193, 255, 0, 1)",
                "rgba(238, 255, 0, 1)",
                "rgba(244, 227, 0, 1)",
                "rgba(249, 198, 0, 1)",
                "#FFC200",
                "#FF7100"
            ];
            _this.heatmap.set('gradient', _this.heatmap.get('gradient') ? null : gradient);
        };
        this.toggleHeat = function () {
            _this.heatmap.setMap(_this.heatmap.getMap() ? null : _this.map);
        };
        this.getVisaData = function () {
            _this.apiService.getMeasurement('30307').subscribe(function (response) {
                _this.visaData = response;
                _this.prepPieChart(_this.visaData.spendOutsideGeography);
            });
        };
        this.toggleSales = function (value) {
            _this.salesYoY = value;
        };
        this.toggleTrans = function (value) {
            _this.transYoY = value;
        };
        this.getPlaceData = function () {
            _this.test = _this.mapApi.getTopPlaces(4);
        };
        this.prepPieChart = function (outpercent) {
            var inpercent = 100 - outpercent;
            _this.chartData = {
                labels: ['Out', 'In'],
                datasets: [
                    {
                        data: [outpercent, inpercent],
                        backgroundColor: [
                            '#192161',
                            '#65cf64'
                        ]
                    }
                ]
            };
            _this.chartOptions = {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 10
                    }
                }
            };
        };
        this.searchForm = this.fb.group({
            business: ['', forms_1.Validators.required],
            zip: ['', forms_1.Validators.required],
            radius: ['']
        });
    }
    MapApiComponent.prototype.ngOnInit = function () {
        this.map = new google.maps.Map(document.getElementById('googleMap'), {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
                // {
                //   featureType: 'poi.business',
                //   stylers: [{ visibility: 'off' }]
                // },
                // {
                //   featureType: 'transit',
                //   elementType: 'labels.icon',
                //   stylers: [{ visibility: 'off' }]
                // },
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{ color: '#263c3f' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#6b9a76' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#38414e' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#212a37' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#9ca5b3' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#746855' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#1f2835' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#f3d19c' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{ color: '#2f3948' }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#17263c' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#515c6d' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#17263c' }]
                }
            ]
        });
        this.mapApi.setMap(this.map);
        this.getData();
        this.getVisaData();
    };
    return MapApiComponent;
}());
__decorate([
    core_1.ViewChild('map'),
    __metadata("design:type", core_1.ElementRef)
], MapApiComponent.prototype, "mapel", void 0);
MapApiComponent = __decorate([
    core_1.Component({
        selector: 'app-map-api',
        templateUrl: './map-api.component.html',
        styleUrls: ['./map-api.component.scss']
    }),
    __metadata("design:paramtypes", [gmaps_service_1.GmapsService,
        router_1.ActivatedRoute,
        api_service_1.ApiService,
        forms_1.FormBuilder])
], MapApiComponent);
exports.MapApiComponent = MapApiComponent;
//# sourceMappingURL=map-api.component.js.map