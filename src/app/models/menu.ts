
export class Menu {

  subMenus !: Menu[];
  menuLinkText: string;
  isDisabled: boolean;
  id: string;
  routerLink:string;

  constructor(id:string, menuLinkText:string, isDisabled:boolean, subMenus:Menu[], routerLink:string) { 
    this.id=id;
    this.menuLinkText=menuLinkText;
    this.isDisabled=isDisabled;
    this.subMenus=subMenus;
    this.routerLink=routerLink;
  }

}
   
