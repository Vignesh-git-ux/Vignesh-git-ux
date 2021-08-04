"use strict";
exports.__esModule = true;
exports.Group = void 0;
var Group = /** @class */ (function () {
    function Group(TransactionType, VerNum, GRPID, ForceINIT) {
        this.AgentID = localStorage.getItem("AgentID") || "";
        this.AgentSine = localStorage.getItem("AgentSine") || "";
        this.AirportCode = localStorage.getItem("AirportCode") || "";
        this.DutyCodeID = localStorage.getItem("DutyCodeID") || "";
        this.TransactionType = TransactionType;
        this.VerNum = VerNum;
        this.GRPID = GRPID;
        this.ForceINIT = ForceINIT;
    }
    return Group;
}());
exports.Group = Group;
