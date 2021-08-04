import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Menu} from '../../models/menu';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }

  // Observable string sources
  private menuDisplayedSource = new Subject<string>();
 // private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  menuDisplayed$ = this.menuDisplayedSource.asObservable();
  //missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  displayMenu(display: string) {
    this.menuDisplayedSource.next(display);
  }

  // confirmMission(astronaut: string) {
  //   this.missionConfirmedSource.next(astronaut);
  // }
}