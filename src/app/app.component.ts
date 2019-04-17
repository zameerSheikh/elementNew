import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from './common-modules/services/common-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private _commonService: CommonServicesService){};

  showSticky: boolean = false;

  ngOnInit(){
    this._commonService.sticky.subscribe(stickyStatus => this.showSticky = stickyStatus);

  }

  title = 'elementNew';
  public showStikcy: boolean = true;

}

