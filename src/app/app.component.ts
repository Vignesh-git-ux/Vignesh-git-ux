import { Component } from '@angular/core';
import { User } from './models/user';
import {UserService} from './services/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {

    user !: User;
    title = "Passenger Re-accom Manager";

    constructor(private userService : UserService) {
    }

    getLoggedInUser() {
      return this.userService.getUser();
    }
}
