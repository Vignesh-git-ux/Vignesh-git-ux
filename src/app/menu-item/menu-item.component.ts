import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {Menu} from '../models/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css', './menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() items !: Menu[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
