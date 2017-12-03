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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var api_service_1 = require("../services/api.service");
var CommandCenterComponent = (function () {
    function CommandCenterComponent(route, fb, api) {
        this.route = route;
        this.fb = fb;
        this.api = api;
        this.selectedRadius = '10 mile radius';
        this.msgs = [];
        this.searchForm = this.fb.group({
            business: ['', forms_1.Validators.required],
            zip: ['', forms_1.Validators.required],
            radius: ['']
        });
        this.data = {
            labels: [
                'Average Transaction Frequencey',
                'Sales Transaction Count Growth MoM',
                'Sales Transaction Count Growth YoY',
                'Sales Volume Growth MoM',
                'Sales Volume Growth YoY',
                'Spend Outside Geography'
            ],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [4.75, 7.4982, -5.9569, 7.2337, -31.7596, 24.94],
                    fill: false,
                    borderColor: '#4bc0c0'
                }
            ]
        };
    }
    CommandCenterComponent.prototype.ngOnInit = function () {
        this.api.getMeasurement('30044').subscribe(function (result) {
            console.log(result);
        });
    };
    CommandCenterComponent.prototype.changeRadius = function (radius) {
        this.selectedRadius = radius;
    };
    return CommandCenterComponent;
}());
CommandCenterComponent = __decorate([
    core_1.Component({
        selector: 'app-command-center',
        templateUrl: './command-center.component.html',
        styleUrls: ['./command-center.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        forms_1.FormBuilder,
        api_service_1.ApiService])
], CommandCenterComponent);
exports.CommandCenterComponent = CommandCenterComponent;
//# sourceMappingURL=command-center.component.js.map