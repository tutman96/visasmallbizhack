"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
// Conps
var app_component_1 = require("./app.component");
var landing_component_1 = require("./landing/landing.component");
var command_center_component_1 = require("./command-center/command-center.component");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var map_api_component_1 = require("./map-api/map-api.component");
var gmaps_service_1 = require("./services/gmaps.service");
var new_map_component_1 = require("./new-map/new-map.component");
var api_service_1 = require("./services/api.service");
// Modules
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var tofixed_pipe_1 = require("./pipes/tofixed.pipe");
var appRoutes = [
    {
        path: 'crisis-center',
        component: command_center_component_1.CommandCenterComponent,
        data: { formData: 'data' }
    },
    {
        path: 'welcome',
        component: landing_component_1.LandingComponent
    },
    {
        path: 'map-api',
        component: map_api_component_1.MapApiComponent
    },
    {
        path: 'new-map',
        component: new_map_component_1.NewMapComponent
    },
    { path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            landing_component_1.LandingComponent,
            command_center_component_1.CommandCenterComponent,
            page_not_found_component_1.PageNotFoundComponent,
            map_api_component_1.MapApiComponent,
            new_map_component_1.NewMapComponent,
            tofixed_pipe_1.TofixedPipe
        ],
        imports: [
            primeng_1.SharedModule,
            primeng_2.DropdownModule,
            primeng_2.InputSwitchModule,
            primeng_2.ChartModule,
            primeng_2.DropdownModule,
            platform_browser_1.BrowserModule,
            http_1.HttpClientModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot(appRoutes)
        ],
        providers: [gmaps_service_1.GmapsService, api_service_1.ApiService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map