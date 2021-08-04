import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css', './header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  @Input() user !:User;
  @Input() title !: String;
  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
