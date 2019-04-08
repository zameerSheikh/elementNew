import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

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
}

