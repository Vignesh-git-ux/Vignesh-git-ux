import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { MenuService } from '../services/menus/menu.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-scmlanding',
  templateUrl: './scmlanding.component.html',
  styleUrls: ['../../../node_modules/@angular/cdk/overlay-prebuilt.css','../../../node_modules/material-design-icons/iconfont/material-icons.css', './scmlanding.component.scss']
})
export class ScmlandingComponent implements OnInit, OnDestroy {
  
  title = "Passenger Re-accom Manager";
  subscription : Subscription;

  public isVisibleMenu = "true";

  constructor(private userService : UserService, private menuService : MenuService) {
    this.subscription = menuService.menuDisplayed$.subscribe(
        display => {
          this.isVisibleMenu = display;
        });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  menuEventHandler($event : any) {
    this.isVisibleMenu = $event;
  }

  getLoggedInUser() {
    return this.userService.getUser();
  }

}
