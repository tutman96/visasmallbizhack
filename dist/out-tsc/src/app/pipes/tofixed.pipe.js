"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TofixedPipe = (function () {
    function TofixedPipe() {
    }
    TofixedPipe.prototype.transform = function (value, args) {
        return this.roundTo(value, 2);
    };
    TofixedPipe.prototype.roundTo = function (n, digits) {
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
    return TofixedPipe;
}());
TofixedPipe = __decorate([
    core_1.Pipe({
        name: 'tofixed'
    })
], TofixedPipe);
exports.TofixedPipe = TofixedPipe;
//# sourceMappingURL=tofixed.pipe.js.map