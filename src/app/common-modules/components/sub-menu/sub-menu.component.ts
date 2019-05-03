import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { SourceManagementService } from '../../../modules/source-management/source-management.service';
// import * as $ from 'jquery';

declare var $: any

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {


  constructor(private modalService: NgbModal, private sourceMngService: SourceManagementService) { }

  domainList = [];
  selectedDomains = [];
  jurisdictionList = [];
  selectedJurisdictions = [];
  mediaList = [];
  selectedMedias = [];
  industryList = [];
  selectedIndustries = [];
  domainSettings = {};
  jurisdictionSettings = {};
  mediaSettings = {};
  industrySettings = {};

  ngOnInit() {

          this.domainSettings = { 
              singleSelection: false, 
              text:"Select",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class",
              primaryKey: "domainId",
              labelKey: "domainName"
            };

            Object.assign(this.jurisdictionSettings, this.domainSettings);
            Object.assign(this.mediaSettings, this.domainSettings);
            Object.assign(this.industrySettings, this.domainSettings);

            this.jurisdictionSettings['primaryKey'] = "jurisdictionId";
            this.jurisdictionSettings['labelKey'] = "jurisdictionName";

            this.mediaSettings['primaryKey'] = "mediaId";
            this.mediaSettings['labelKey'] = "mediaName";

            this.industrySettings['primaryKey'] = "industryId";
            this.industrySettings['labelKey'] = "industryName";



            this.sourceMngService.getSourceIndustryList().subscribe((list:[])=>{

              this.industryList = list;
            });

            this.sourceMngService.getSourceDomainList().subscribe((list:[])=>{
              this.domainList = list;
            });

            this.sourceMngService.getSourceMediaList().subscribe((list:[])=>{
              this.mediaList = list;
            });

            this.sourceMngService.getSourceJurisdictionList().subscribe((list:[])=>{
              this.jurisdictionList = list;
            });
      }

      initializeScroll(){
        $(".ng-multiselect-wrapper").click(function(){
          $(".c-list").mThumbnailScroller({
            axis:"x"
          });
        });
      }
      

  onItemSelect(item:any){
    console.log(item);
    this.initializeScroll();
  }
  OnItemDeSelect(item:any){
      console.log(item);
      this.initializeScroll();
  }
  onSelectAll(items: any){
      console.log(items);
      this.initializeScroll();
  }
  onDeSelectAll(items: any){
      console.log(items);
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'custom-modal modal-md bst_modal', size: 'lg' });
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

  modalClose(){
    console.log('dismissed');
    this.modalService.dismissAll();
    this.selectedDomains = [];
    this.selectedJurisdictions = [];
    this.selectedIndustries = [];
    this.selectedMedias = [];
  }

}
