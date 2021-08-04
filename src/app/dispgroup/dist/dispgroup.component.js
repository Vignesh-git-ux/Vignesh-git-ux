"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DispgroupComponent = void 0;
var core_1 = require("@angular/core");
var group_1 = require("../models/group");
var DispgroupComponent = /** @class */ (function () {
    // displayedColumns: string[] = ['GRPID', 'VerNum', 'TransactionType', 'AgentID', 'initBtn'];
    // dataSource = new Array<DisplayGroupresponse>();
    // @ViewChild(MatTable) table !: MatTable<any>;
    function DispgroupComponent(route, router, groupService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.groupService = groupService;
        this.route.params.subscribe(function (params) { return _this.dispGroup(params["GRPID"], params["VerNum"]); });
    }
    DispgroupComponent.prototype.ngOnInit = function () {
    };
    DispgroupComponent.prototype.dispGroup = function (grpId, verNum) {
        var group1 = new group_1.Group("DISPGRP", verNum, grpId, "");
        this.groupService.sendPostRequest(group1, this.callBackGroup.bind(this));
    };
    DispgroupComponent.prototype.callBackGroup = function (group) {
        this.group = group;
        // this.dataSource.push(this.group);
        // this.table.renderRows();
    };
    DispgroupComponent = __decorate([
        core_1.Component({
            selector: 'app-dispgroup',
            templateUrl: './dispgroup.component.html',
            styleUrls: ['./dispgroup.component.scss']
        })
    ], DispgroupComponent);
    return DispgroupComponent;
}());
exports.DispgroupComponent = DispgroupComponent;
