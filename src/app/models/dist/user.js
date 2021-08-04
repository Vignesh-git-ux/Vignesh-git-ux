"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, fullName, shortName, email) {
        localStorage.removeItem("LoggedInUser");
        this.id = id;
        this.fullName = fullName;
        this.shortName = shortName;
        this.email = email;
        this.AgentID = "ASGHAR01";
        this.AgentSine = "09A8964";
        this.AirportCode = "GYE";
        this.DutyCodeID = "RU";
        localStorage.setItem("LoggedInUser", JSON.stringify(this));
    }
    return User;
}());
exports.User = User;
