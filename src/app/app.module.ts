import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { MenusComponent } from './menus/menus.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { CreategroupComponent } from './pagecontent/group/creategroup/creategroup.component';
import { DispgroupComponent } from './pagecontent/group/dispgroup/dispgroup.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule  } from '@angular/material/table';
import {MatSnackBarModule  } from '@angular/material/snack-bar';
import {MatDialogModule  } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { ScmlandingComponent } from './scmlanding/scmlanding.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { DispscheduleComponent } from './pagecontent/schedule/dispschedule/dispschedule.component';
import { UseroverlayComponent } from './header/useroverlay/useroverlay.component';
import { ErrorComponent } from './error/error/error.component';
import { ConfirmDeletePSCComponent } from './pagecontent/schedule/confirm-delete-psc/confirm-delete-psc.component';
import { AirlineDetailsComponent } from './airline-details/airline-details.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectModule } from '@angular/material/select';
// import { ButtonRendererComponent } from './button-renderer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenusComponent,
    MenuItemComponent,
    CreategroupComponent,
    LoginComponent,
    ScmlandingComponent,
    DispgroupComponent,
    DispscheduleComponent,
    UseroverlayComponent,
    ErrorComponent,
    ConfirmDeletePSCComponent,
    AirlineDetailsComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    OverlayModule,
    MatDividerModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule ,
    NgbModule,
    ClickOutsideModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [{provide: OverlayContainer},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
