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
    title = "Schedule Change Manager";

    constructor(private userService : UserService) {
    }

    getLoggedInUser() {
      return this.userService.getUser();
    }
}
