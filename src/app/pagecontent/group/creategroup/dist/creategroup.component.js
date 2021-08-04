"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreategroupComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var group_1 = require("src/app/models/group");
var CreategroupComponent = /** @class */ (function () {
    function CreategroupComponent(groupService, route, router) {
        this.groupService = groupService;
        this.route = route;
        this.router = router;
        this.displayedColumns = ['GRPID', 'VerNum', 'TransactionType', 'AgentID', 'initBtn'];
        this.dataSource = new Array();
        this.createNewGroup();
    }
    CreategroupComponent.prototype.createNewGroup = function () {
        this.errorMessage = "";
        var group = new group_1.Group("NEWGRP", "", "", "");
        this.groupService.sendPostRequest(group, this.callBackGroup.bind(this));
    };
    CreategroupComponent.prototype.dispGroup = function (row) {
        this.errorMessage = "";
        this.router.navigate(["/scmlanding/dispgrp", { "GRPID": row.GRPID, "VerNum": row.VerNum }]);
    };
    CreategroupComponent.prototype.initGroup = function (row) {
        var group1 = new group_1.Group("INITGRP", row.VerNum, row.GRPID, "Y");
        this.groupService.sendPostRequest(group1, this.callBackGroup.bind(this));
    };
    CreategroupComponent.prototype.importGroup = function () {
        this.errorMessage = "";
        var group1 = new group_1.Group("INITGRP", "V0001", "20210201GRP000005", "Y");
        this.groupService.sendPostRequest(group1, this.callBackGroup.bind(this));
    };
    CreategroupComponent.prototype.callBackGroup = function (group) {
        this.errorMessage = "";
        if (group.HDRResponseCode != "000") {
            this.errorMessage = group.ResponseText;
        }
        this.dataSource.push(group);
        this.table.renderRows();
    };
    CreategroupComponent.prototype.selectGroup = function (row) {
        this.errorMessage = "";
        this.selectedGroup = row;
    };
    __decorate([
        core_1.ViewChild(table_1.MatTable)
    ], CreategroupComponent.prototype, "table");
    CreategroupComponent = __decorate([
        core_1.Component({
            selector: 'app-creategroup',
            templateUrl: './creategroup.component.html',
            styleUrls: ['./creategroup.component.scss']
        })
    ], CreategroupComponent);
    return CreategroupComponent;
}());
exports.CreategroupComponent = CreategroupComponent;
