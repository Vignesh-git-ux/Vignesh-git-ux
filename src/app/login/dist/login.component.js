"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.title = "Schedule Change Manager";
        this.submitted = false;
        this.form = new forms_1.FormGroup({
            userName: new forms_1.FormControl('', [forms_1.Validators.required]),
            password: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        localStorage.removeItem("LoggedInUser");
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () {
            return this.form.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.submit = function () {
        this.submitted = true;
        this.userService.setUser(this.form.value["userName"], this.form.value["password"]);
        if (this.form.valid) {
            this.router.navigate(['/scmlanding']);
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css', './login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
