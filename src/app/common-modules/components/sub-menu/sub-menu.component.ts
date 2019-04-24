import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
// import * as $ from 'jquery';

declare var $: any

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {


  constructor(private modalService: NgbModal) { }

  dropdownList = [];
  industryList = [];
  selectedItems = [];
  dropdownSettings = {};

  formModel = {
    name: null,
    email: '',
    skills: []
  };

  ngOnInit() {
          this.dropdownList = [
            {"id":1,"itemName":"India"},
            {"id":2,"itemName":"Singapore"},
            {"id":3,"itemName":"Australia"},
            {"id":4,"itemName":"Canada"},
            {"id":5,"itemName":"South Korea"},
            {"id":6,"itemName":"Germany"},
            {"id":7,"itemName":"France"},
            {"id":8,"itemName":"Russia"},
            {"id":9,"itemName":"Italy"},
            {"id":10,"itemName":"Sweden"}
          ];
          this.selectedItems = [
              {"id":2,"itemName":"Singapore"},
              {"id":3,"itemName":"Australia"},
              {"id":4,"itemName":"Canada"},
              {"id":5,"itemName":"South Korea"}
          ];
          this.dropdownSettings = { 
              singleSelection: false, 
              text:"Select",
              selectAllText:'Select All',
              unSelectAllText:'UnSelect All',
              enableSearchFilter: true,
              classes:"myclass custom-class"
            };
            this.industryList = [
              {"id":1,"itemName":"first"},
              {"id":2,"itemName":"IT"},
              {"id":3,"itemName":"Software"},
              {"id":4,"itemName":"Hardware"},
              {"id":5,"itemName":"Services"},
              {"id":6,"itemName":"ecommerse"},
              {"id":7,"itemName":"fashion"},
              {"id":8,"itemName":"civil"},
              {"id":9,"itemName":"mobile"},
              {"id":10,"itemName":"electronics"}
            ]

          //   $(document).ready(function(){
          //     $(".c-list").mThumbnailScroller({
          //       axis:"x"
          //     });
          // });
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
    console.log(this.selectedItems);
    this.initializeScroll();
  }
  OnItemDeSelect(item:any){
      console.log(item);
      console.log(this.selectedItems);
      this.initializeScroll();
  }
  onSelectAll(items: any){
      console.log(items);
      this.initializeScroll();
  }
  onDeSelectAll(items: any){
      console.log(items);
      this.initializeScroll();
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'custom-modal modal-md bst_modal', size: 'lg' });
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

}
