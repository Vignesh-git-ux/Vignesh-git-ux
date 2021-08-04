"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var menu_1 = require("@angular/material/menu");
var card_1 = require("@angular/material/card");
var toolbar_1 = require("@angular/material/toolbar");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var grid_list_1 = require("@angular/material/grid-list");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var header_component_1 = require("./header/header.component");
var menus_component_1 = require("./menus/menus.component");
var menu_item_component_1 = require("./menu-item/menu-item.component");
var overlay_1 = require("@angular/cdk/overlay");
var title_component_1 = require("./title/title.component");
var creategroup_component_1 = require("./pagecontent/group/creategroup/creategroup.component");
var http_1 = require("@angular/common/http");
var table_1 = require("@angular/material/table");
var login_component_1 = require("./login/login.component");
var scmlanding_component_1 = require("./scmlanding/scmlanding.component");
var core_2 = require("@angular/material/core");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                menus_component_1.MenusComponent,
                menu_item_component_1.MenuItemComponent,
                title_component_1.TitleComponent,
                creategroup_component_1.CreategroupComponent,
                login_component_1.LoginComponent,
                scmlanding_component_1.ScmlandingComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                toolbar_1.MatToolbarModule,
                menu_1.MatMenuModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                card_1.MatCardModule,
                button_1.MatButtonModule,
                overlay_1.OverlayModule,
                divider_1.MatDividerModule,
                http_1.HttpClientModule,
                table_1.MatTableModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                grid_list_1.MatGridListModule
            ],
            providers: [{ provide: overlay_1.OverlayContainer },
                { provide: core_2.ErrorStateMatcher, useClass: core_2.ShowOnDirtyErrorStateMatcher }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
