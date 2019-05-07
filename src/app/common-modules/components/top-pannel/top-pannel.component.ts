import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../../services/common-services.service';
import { AppConstants } from '../../../app.constant';
import { NgbTabsetConfig, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
    showSticky: false  
  }

  public stickies: string[] = ['first', 'second', 'third', 'fourth'];


  constructor(private _commonServices : CommonServicesService,
             private config: NgbTabsetConfig,
             private popoverConfig: NgbPopoverConfig,
             private router: Router) { 
      config.type = 'pills';
      config.justify = 'fill';
      popoverConfig.autoClose = false;
  }

  ngOnInit() {  
    this._commonServices.sticky.subscribe(stickyStatus => this.showHideTopPannelItems.showSticky = stickyStatus);
  }

  /**Toggle ClipBoard div */
  toggleTopPannelItems(type:string){
    this.showHideTopPannelItems.showHideClipBoard = type == "clipboard" ? !this.showHideTopPannelItems.showHideClipBoard : false;
    this.showHideTopPannelItems.showHideNotifications = type == "notification" ? !this.showHideTopPannelItems.showHideNotifications : false;
    this.showHideTopPannelItems.showHideUserProfile = type == "userProfile" ? !this.showHideTopPannelItems.showHideUserProfile : false;
    this.showHideTopPannelItems.showSitcky = false;
    if(type == "clipboard" && !this.showHideTopPannelItems.showHideClipBoard){
      this.showHideTopPannelItems.showSticky = false;
      this._commonServices.showHideSticky.next(this.showHideTopPannelItems.showSticky); 
    }
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
    this.router.navigate(['ehubui/domain']);
  }

  toggleSticky(){
    console.log('sticked');
    this.showHideTopPannelItems.showSitcky = !this.showHideTopPannelItems.showSitcky;
    this._commonServices.toggleSticky();
  }

}
