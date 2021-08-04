"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ScmlandingComponent = void 0;
var core_1 = require("@angular/core");
var ScmlandingComponent = /** @class */ (function () {
    function ScmlandingComponent(userService) {
        this.userService = userService;
        this.title = "Schedule Change Manager";
    }
    ScmlandingComponent.prototype.ngOnInit = function () {
    };
    ScmlandingComponent.prototype.getLoggedInUser = function () {
        return this.userService.getUser();
    };
    ScmlandingComponent = __decorate([
        core_1.Component({
            selector: 'app-scmlanding',
            templateUrl: './scmlanding.component.html',
            styleUrls: ['../../../node_modules/@angular/cdk/overlay-prebuilt.css', '../../../node_modules/material-design-icons/iconfont/material-icons.css', './scmlanding.component.scss']
        })
    ], ScmlandingComponent);
    return ScmlandingComponent;
}());
exports.ScmlandingComponent = ScmlandingComponent;
