import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';
import { AppConstants } from '../../../app.constant';

@Component({
  selector: 'app-top-pannel',
  templateUrl: './top-pannel.component.html',
  styleUrls: ['./top-pannel.component.scss']
})



export class TopPannelComponent implements OnInit {

  public showHideTopPannelItems:any = {
    showHideClipBoard :false,
    showHideNotificalse : false,
    showHideUserProfile : false,  
  }

  constructor(private _commonServices : CommonServicesService) { }

  ngOnInit() {  
  }

  /**Toggle ClipBoard div */
  toggleTopPannelItems(type:string){
    this.showHideTopPannelItems.showHideClipBoard = type == "clipboard" ? !this.showHideTopPannelItems.showHideClipBoard : false;
    this.showHideTopPannelItems.showHideNotifications = type == "notification" ? !this.showHideTopPannelItems.showHideNotifications : false;
    this.showHideTopPannelItems.showHideUserProfile = type == "userProfile" ? !this.showHideTopPannelItems.showHideUserProfile : false;
  }


  /**Get logout */
  logout(){
    this._commonServices.getLogOut().subscribe(response => {
      window.location.href = AppConstants.rootPath + 'login';
      window.localStorage.removeItem('ehubObject');
      console.log("================================");
      window.location.reload();
      console.log("================================");

      console.log("response",response);
    });
  }
}
