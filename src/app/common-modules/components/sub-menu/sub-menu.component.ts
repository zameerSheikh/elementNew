import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';
import { CommonServicesService } from '../../services/common-services.service';
// import * as $ from 'jquery';

declare var $: any

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {

  currentUrl = '';
  showAddSource: boolean = false;

  constructor(private router: Router,
              private cmnSrvc: CommonServicesService) { }


  ngOnInit() {

    this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd ) {
            this.currentUrl = event.url;
            console.log('this.currentUrl: ', this.currentUrl);
            if(this.currentUrl.split('/')[2] === 'sourceManagement'){
              this.showAddSource = true;
            }else{
              this.showAddSource = false;
            }
          }
        });

          
      }

      openAddSourceModal(){
        this.cmnSrvc.addSource.next(true)
      };

}
