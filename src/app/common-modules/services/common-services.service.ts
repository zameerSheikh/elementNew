import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app.constant';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  private isStickyNoteVisible: boolean = false;

          showHideSticky = new BehaviorSubject<boolean>(this.isStickyNoteVisible);
          sticky = this.showHideSticky.asObservable();

          // to open add source modal from submenu component
          addSource = new Subject();

  constructor(private httpClient : HttpClient) { }

  /*
  * @purpose: logout
  * @created: 3rd april 2019
  * @params: null
  * @returns: no
  * @author: karnakar
*/

  getLogOut(){
    return this.httpClient.get(AppConstants.Ehub_UI_API + "logout");
  }

  toggleSticky(){
    this.isStickyNoteVisible = !this.isStickyNoteVisible;
    this.showHideSticky.next(this.isStickyNoteVisible);
  };

}

