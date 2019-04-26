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
  dropdownSettings = {};
  domainSettings = {};
  jurisdictionSettings = {};
  mediaSettings = {};
  industrySettings = {};

  ngOnInit() {
          this.domainList = [
            {"id":1,"itemName":"www"},
            {"id":2,"itemName":"com"},
            {"id":3,"itemName":"in"},
            {"id":4,"itemName":"au"},
            {"id":5,"itemName":"sff"},
            {"id":6,"itemName":"ger"},
            {"id":7,"itemName":"fra"},
            {"id":8,"itemName":"Rus"},
            {"id":9,"itemName":"Ita"},
            {"id":10,"itemName":"Swe"}
          ];
          this.selectedDomains = [
              
          ];

          this.mediaList = [
            {"id":1,"itemName":"audio"},
            {"id":2,"itemName":"video"},
            {"id":3,"itemName":"jpeg"},
            {"id":4,"itemName":"png"},
            {"id":5,"itemName":"svg"},
            {"id":6,"itemName":"mp3"},
            {"id":7,"itemName":"mp4"},
            {"id":8,"itemName":"acc"},
            {"id":9,"itemName":"auc"},
            {"id":10,"itemName":"scc"}
          ];

          this.jurisdictionList = [
            {"id":1,"itemName":"India"},
            {"id":2,"itemName":"china"},
            {"id":3,"itemName":"US"},
            {"id":4,"itemName":"UK"},
            {"id":5,"itemName":"Japan"},
            {"id":6,"itemName":"Germany"},
            {"id":7,"itemName":"Australia"},
            {"id":8,"itemName":"NZ"}
          ];

          this.industryList = [
            {"id":1,"itemName":"first"},
            {"id":2,"itemName":"tech"},
            {"id":3,"itemName":"apple"},
            {"id":4,"itemName":"google"},
            {"id":5,"itemName":"yahoo"},
            {"id":6,"itemName":"gmail"},
            {"id":7,"itemName":"whatsapp"},
            {"id":8,"itemName":"telegram"}
          ];

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
            this.jurisdictionSettings = { 
              singleSelection: false, 
              text:"Select",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class",
              primaryKey: "jurisdictionId",
              labelKey: "jurisdictionName"
            };
            this.mediaSettings = { 
              singleSelection: false, 
              text:"Select",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class",
              primaryKey: "mediaId",
              labelKey: "mediaName"
            };
            this.industrySettings = { 
              singleSelection: false, 
              text:"Select",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class",
              primaryKey: "industryId",
              labelKey: "industryName"
            };

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
