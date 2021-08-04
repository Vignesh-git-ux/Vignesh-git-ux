import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispgroupComponent } from './pagecontent/group/dispgroup/dispgroup.component';
import { LoginComponent } from './login/login.component';
import { CreategroupComponent } from './pagecontent/group/creategroup/creategroup.component';
import { ScmlandingComponent } from './scmlanding/scmlanding.component';
import { DispscheduleComponent } from './pagecontent/schedule/dispschedule/dispschedule.component';
import { AirlineDetailsComponent } from './airline-details/airline-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'scmlanding', component: ScmlandingComponent, children :[
    { path: 'listGrps/:dispOption', component: CreategroupComponent},
    {path: 'dispgrp', component: DispgroupComponent},
    {path: 'disppsc', component: DispscheduleComponent},    
  ]}    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
