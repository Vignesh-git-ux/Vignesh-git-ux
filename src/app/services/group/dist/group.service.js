"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var GroupService = /** @class */ (function () {
    function GroupService(httpClient) {
        this.httpClient = httpClient;
        this.REST_API_SERVER = "https://tcga2jn4b7.execute-api.us-east-2.amazonaws.com/v1/grp";
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    GroupService.prototype.sendPostRequest = function (group, callBack) {
        var grp;
        this.httpClient.post(this.REST_API_SERVER, group, this.httpOptions)
            .subscribe(function (data) {
            callBack(data);
        });
    };
    GroupService.prototype.sendGetRequest = function (group, callBack) {
        var gethttpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(group)
        };
        this.httpClient.get(this.REST_API_SERVER, gethttpOptions)
            .subscribe(function (data) {
            callBack(data);
        });
    };
    GroupService.prototype.handleError = function (error) {
        var errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = "Error: " + error.error.message;
        }
        else {
            // Server-side errors
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return rxjs_1.throwError(errorMessage);
    };
    GroupService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GroupService);
    return GroupService;
}());
exports.GroupService = GroupService;
