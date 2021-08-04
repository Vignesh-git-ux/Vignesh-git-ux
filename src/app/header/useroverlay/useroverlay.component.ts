import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-useroverlay',
  templateUrl: './useroverlay.component.html',
  styleUrls: ['../../../../node_modules/material-design-icons/iconfont/material-icons.css','./useroverlay.component.scss']
})
export class UseroverlayComponent implements OnInit {

  user !: User;
  constructor(private userService : UserService) {
    this.user = this.userService.getUser();
  }

 

  ngOnInit(): void {
  }
}
