import { Component, OnInit, ViewChild } from '@angular/core';
import {Menu} from '../models/menu';
import  *  as  data  from  './../config/menus.json';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['../../../node_modules/material-design-icons/iconfont/material-icons.css','./menus.component.scss']
})
export class MenusComponent implements OnInit {

  selectedMenu !: Menu;
  menus !: Menu[];

  subMenus !: Menu[];

  
  constructor() { 
    this.menus = (data as any).default as Menu[];
    this.menus.map((obj: Menu) => {
      menuLinkText : obj.menuLinkText;
      isDisabled :  obj.isDisabled;
      id : obj.id;
      subMenus : obj.subMenus;
    });
  }

  ngOnInit(): void {
  }

  getMenus() {
    return this.menus;
  }
 

  openMatMenu(menuItem : Menu) {
    this.selectedMenu = menuItem;
  }
}
