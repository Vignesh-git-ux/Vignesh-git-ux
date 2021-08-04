"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenusComponent = void 0;
var core_1 = require("@angular/core");
var data = require("./../config/menus.json");
var MenusComponent = /** @class */ (function () {
    function MenusComponent() {
        this.menus = data["default"];
        this.menus.map(function (obj) {
            menuLinkText: obj.menuLinkText;
            isDisabled: obj.isDisabled;
            id: obj.id;
            subMenus: obj.subMenus;
        });
    }
    MenusComponent.prototype.ngOnInit = function () {
    };
    MenusComponent.prototype.getMenus = function () {
        return this.menus;
    };
    MenusComponent.prototype.openMatMenu = function (menuItem) {
        this.selectedMenu = menuItem;
    };
    MenusComponent = __decorate([
        core_1.Component({
            selector: 'app-menus',
            templateUrl: './menus.component.html',
            styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css', './menus.component.scss']
        })
    ], MenusComponent);
    return MenusComponent;
}());
exports.MenusComponent = MenusComponent;
