"use strict";
exports.__esModule = true;
exports.Menu = void 0;
var Menu = /** @class */ (function () {
    function Menu(id, menuLinkText, isDisabled, subMenus, routerLink) {
        this.id = id;
        this.menuLinkText = menuLinkText;
        this.isDisabled = isDisabled;
        this.subMenus = subMenus;
        this.routerLink = routerLink;
    }
    return Menu;
}());
exports.Menu = Menu;
