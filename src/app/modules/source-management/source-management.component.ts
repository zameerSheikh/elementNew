import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit} from "@angular/core";
import { SourceManagementService } from './source-management.service';
import { AgGridNg2 } from "ag-grid-angular";
import { GridOptions } from 'ag-grid-community';
import { NgbTabsetConfig, NgbPopoverConfig, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CommonServicesService } from '../../common-modules/services/common-services.service';

import { DynamicHeadersRendererComponent } from './template-renderer/dynamic-headers/dynamic-headers-renderer.component';
import { MediaRendererComponent } from './template-renderer/media-renderer/media-renderer.component';

//Jquery initialization
declare var $: any

//Normal variables
var generalRespData:any = [];
var newsRespData:any = [];
var indexRespData:any = [];

@Component({
  selector: 'app-source-management',
  templateUrl: './source-management.component.html',
  styleUrls: ['./source-management.component.scss']
})

export class SourceManagementComponent implements OnInit {
  @ViewChild("agGrid") agGrid: AgGridNg2;
  @ViewChild("content") modalContent;
  @ViewChild("editContent") editModalContent;

  /**====================== Public variables Start=======================*/

  public gridOptions: GridOptions;

  /** ===================== public type array ========================== */
  public columnDefs:any = [];
  public rowData:any = [];
  public mainClassificationData:any = [];
  public currentTabData:any = [];
  public dynamicHeadersForDataAttributes:any = [];

  /** ========================== public type booleans ========================== */
  public showPopover:boolean = false;
  public isEdit:boolean = false;
  
  /** ========================== public type any ========================== */
  public clsfctn:any;
  public editData:any;
  public editDataInitial:any;
  public editClsfctn: any;
  public _mainPrams:any;
  public getRowHeight:any;
  public defaultColDef:any;

  /** ========================== public type string ========================== */
  public sourcename: string = '';
  public sourcelink: string = '';
  public editSourcename: string = '';
  public editSourcelink: string = '';

  /**====================== Public variables end=======================*/

  /**====================== Private variables start=======================*/

  /** ========================== Private type boolean ========================== */
  private agGridLoader: boolean = false;
  private fisrtCall:boolean = false;

  /** ========================== Private type Array ========================== */
  private responseData:any = [];
  private dynamicHeaders:any = [];
  private finalHeaders:any = [];
  private staticHeaders1:any = ["Source","Link","Domain","Industry","Jurisdiction"];
  private staticHeaders2:any = ["Media", "Visible", "Edit"];

  /** ========================== Private type object ========================== */
  private frameworkComponents:any = {};
  private credibility_digit_map:any = { NONE: "0",LOW: "1",MEDIUM: "2",HIGH: "3"};
  private credibility_text_map:any = { 0: "NONE",1: "LOW",2: "MEDIUM",3: "HIGH"};
  private params = {
    "recordsPerPage":10,
    "pageNumber":1,
    "classificationId":2651660,
    "orderBy":'',
    "orderIn":'',
    "subSlassificationId":'',
    "visible":'',
  }

  /** ========================== Private type number ========================== */
  private totallSourceCount:number = 0;
  private recordsPerPage:number = 10;
  private pageNum:number = 1;

  /** ========================== Private type any ========================== */
  private gridApi:any;
  private gridColumnApi:any;
  private paginationPageSize:any; 
  private visible:any;

  /**====================== Private variables end=======================*/

  /**===================================== Constructor start=====================================*/

  constructor(private _sourceManagementService:SourceManagementService,
              private config: NgbTabsetConfig,
              private cmnSrvc: CommonServicesService,
              private modalService: NgbModal,
              private sourceManagementPopoverConfig: NgbPopoverConfig) {
    
    //this.gridOptions = <GridOptions>{};
    config.type = 'pills';
    config.justify = 'fill';
    sourceManagementPopoverConfig.autoClose = false;
    // this.gridOptions = {
    //   columnDefs: [],
    //   rowData: []
    // }
    this.defaultColDef = {
      resizable: true,
      filter: true
    };
    this.paginationPageSize = 10;
    this.getRowHeight = function(params) {
      if (params.node.level === 0) {
        return 40;
      } else {
        return 25;
      }
    };

    this.frameworkComponents = {
      dynamicHeadersRendererComponent : DynamicHeadersRendererComponent,
      mediaRendererComponent : MediaRendererComponent
    }
  }

  /**===================================== Constructor end=====================================*/

  /**===================================== ngOnInit start=====================================*/
  ngOnInit() {

    this.cmnSrvc.addSource.subscribe(
      (toOpen: boolean)=>{
        if(toOpen){
          this.isEdit = false;
          this.openWindowCustomClass(this.modalContent);
        }
      }
    );

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



    this._sourceManagementService.getSourceIndustryList().subscribe((list:[])=>{

      this.industryList = list;
    });

    this._sourceManagementService.getSourceDomainList().subscribe((list:[])=>{
      this.domainList = list;
    });

    this._sourceManagementService.getSourceMediaList().subscribe((list:[])=>{
      this.mediaList = list;
    });

    this._sourceManagementService.getSourceJurisdictionList().subscribe((list:[])=>{
      this.jurisdictionList = list;
    });

    // this.gridOptions.columnDefs=this.columnDefs;
    // this.gridOptions.rowData=this.rowData;
  }

  /**===================================== ngOnInit end=====================================*/

  /**===================================== getClassifications function start=====================================*/
  getClassifications(){
    this._sourceManagementService.getClassificationsForScource().subscribe(data => {
      this.mainClassificationData = data;
      console.log('this.mainClassificationData : ', this.mainClassificationData );
      this.clsfctn = this.mainClassificationData[0];
    },
    (error => {
      console.log(error);
    }))
  }
  /**===================================== getClassifications function end=====================================*/


  /**===================================== getSources function start=====================================*/
  getSources(values){
    var params = {
      "recordsPerPage":this.recordsPerPage,
      "pageNumber":this.pageNum,
      "classificationId":values.classificationId,
      "orderBy":'',
      "orderIn":'',
      "subSlassificationId":'',
      "visible":'',
    }
    if((generalRespData.length) == 0 || (newsRespData.length == 0) || (indexRespData.length == 0)){
        this._sourceManagementService.getAllSourcesData(params).subscribe(data => {
          this.responseData = data;
          this.setTableData(this.responseData);
          if(values.classifcationName == 'NEWS'){
            newsRespData = data;
            this.currentTabData = data;
            this.totallSourceCount = newsRespData.paginationInformation.totalResults;
          }else if(values.classifcationName == 'INDEX'){
            indexRespData = data;
            this.currentTabData = data;
            this.totallSourceCount = indexRespData.paginationInformation.totalResults;
          }
          return this.responseData;
        })
    }
    else if(generalRespData && values.classifcationName == 'GENERAL'){
      this.currentTabData = generalRespData;
      this.setTableData(generalRespData);
      this.totallSourceCount = generalRespData.paginationInformation.totalResults;
    }else if(newsRespData&& values.classifcationName == 'NEWS'){
      this.currentTabData = newsRespData;
      this.setTableData(newsRespData);
      this.totallSourceCount = newsRespData.paginationInformation.totalResults;
    }else if(indexRespData && values.classifcationName == 'INDEX'){
      this.currentTabData = indexRespData;
      this.setTableData(indexRespData);
      this.totallSourceCount = indexRespData.paginationInformation.totalResults;
    }
  }
  /**===================================== getSources function end=====================================*/

  /**===================================== tabChange function start=====================================*/

  tabChange(index,values){
    this.fisrtCall = true;
    this.responseData = [];
    this.getSources(values);
    this.setTableData(this.currentTabData);
    console.log('this.columnDefs: ', this.columnDefs);
    console.log('this.rowData: ', this.rowData);
  }
  /**===================================== tabChange function end=====================================*/


  /**===================================== getAllSources function start=====================================*/
  getAllSources(params1){
    this.agGridLoader = true;
    this._sourceManagementService.getAllSourcesData(this.params).subscribe(data => {
      let secondParams = {
          "recordsPerPage":data.paginationInformation.totalResults,
          "pageNumber":1,
          "classificationId":330,
          // "classificationId":2651660,
          "orderBy":'',
          "orderIn":'',
          "subSlassificationId":'',
          "visible":'',
      }
      this._sourceManagementService.getAllSourcesData(secondParams).subscribe((secondData)=>{
        this.agGridLoader = false;
        this.responseData = secondData;
        this.setTableData(this.responseData);
        generalRespData = secondData;
        this.currentTabData = secondData;
        this.totallSourceCount = generalRespData.paginationInformation.totalResults;
        if(params1){
          params1.api.setColumnDefs(this.columnDefs);
          params1.api.setRowData(this.rowData);
        }
      }, (error)=>{
        this.agGridLoader = false;
        console.log('error', error);
      });
    }, (error)=>{
      this.agGridLoader = false;
      console.log('error', error);
    });
  }
  /**===================================== getAllSources function end=====================================*/
  
  /**===================================== onGridReady function start=====================================*/
  /**Getting data from get source api */
  onGridReady(params1){
    this.getClassifications();
    this.gridApi = params1.api;
    this.gridColumnApi = params1.gridColumnApi;
    if(this.fisrtCall == false){
      this.getAllSources(params1);
    }
  }
  /**===================================== onGridReady function end=====================================*/

  /**===================================== setTableData function start=====================================*/
  setTableData(responseData){
    console.log('responseData==============>: ', responseData);
    this.columnDefs = [];
    this.rowData = [];
    
    var dynamicHeadersCredibility = {};
    var finalStaticHeadersData = [];
    var secondStaticHeadersData = {};

    if(responseData && responseData.result.length){
      /* Create Dynamic Final Header */
      for(let i=0;i<responseData.result.length;i++){
          dynamicHeadersCredibility = {};
          finalStaticHeadersData = [];
        if(responseData.result[i].sourceDomain && responseData.result[i].sourceIndustry && responseData.result[i].sourceJurisdiction){
          finalStaticHeadersData.push({
            source: responseData.result[i].sourceName = responseData.result[i].sourceName ? responseData.result[i].sourceName :'',
            link: '<a href="http://'+(responseData.result[i].sourceUrl = responseData.result[i].sourceUrl ? responseData.result[i].sourceUrl : "")+'" target="_blank">'+(responseData.result[i].sourceUrl = responseData.result[i].sourceUrl ? responseData.result[i].sourceUrl : "")+'</a>',
            domain: responseData.result[i].sourceDomain.map(a => {return (a.domainName = a.domainName ? a.domainName : '')}),
            industry: responseData.result[i].sourceIndustry.map(a => {return (a.industryName = a.industryName ? a.industryName : '')}),
            jurisdiction: responseData.result[i].sourceJurisdiction.map(a => {return (a.jurisdictionName = a.jurisdictionName ? a.jurisdictionName : '')})
          });  
        }
        secondStaticHeadersData = {
          media: [responseData.result[i],this.mediaList],
          visible: "True",
          edit: this.getEditIcons(" ")
        }

        if(responseData.result[i].classifications[0] && responseData.result[i].classifications[0].subClassifications){
          for(let j=0;j<responseData.result[i].classifications[0].subClassifications.length;j++){
            if(responseData.result[i].classifications[0].subClassifications[j].dataAttributes.length > 0){
              dynamicHeadersCredibility[responseData.result[i].classifications[0].subClassifications[j].subClassifcationName.toLowerCase().split(" ").join("_")] = responseData.result[i];
            }
            else{
              dynamicHeadersCredibility[responseData.result[i].classifications[0].subClassifications[j].subClassifcationName.toLowerCase().split(" ").join("_")] = this.getSlider(responseData.result[i].classifications[0].subClassifications[j].subClassificationCredibility);
            }
          }  
        }
        finalStaticHeadersData.push(dynamicHeadersCredibility);
        finalStaticHeadersData.push(secondStaticHeadersData);
        /**Merging multiple objects into one object */
        var mergedObject = finalStaticHeadersData.reduce((a,b)=>Object.assign(a,b),{});
        this.rowData.push(mergedObject);
      }


      /**Setting dynamic headers */
      var tempVal = responseData.result[0].classifications[0].subClassifications;
      var dynamicHeaders = [];
      for (let i = 0; i < tempVal.length; i++) {
        dynamicHeaders[i] = tempVal[i].subClassifcationName;
      }
      this.dynamicHeadersForDataAttributes = dynamicHeaders;
      this.finalHeaders = this.staticHeaders1.concat(dynamicHeaders).concat(this.staticHeaders2);

      console.log("this.finalHeaders",this.finalHeaders);
      var temp = 0;
      for (let i = 0; i < this.finalHeaders.length; i++) {
          if(this.finalHeaders[i] == "Media"){
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 200,
              height: "300px",
              // suppressMenu: true,
              // suppressSorting: true,
              cellRendererFramework: MediaRendererComponent
            });
          } else if(this.finalHeaders[i] == "Visible"){
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 200,
              //cellRendererFramework: DynamicHeadersRendererComponent,
              suppressMenu: true,
              suppressSorting: true,
              template:
              `<i class="fa fa-eye f-16 text-dark-cream font-16" style="cursor:pointer;" data-action-type="view"></i>`,
            });
          } else if(this.finalHeaders[i] == "Edit"){
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 150,
              //cellRendererFramework: DynamicHeadersRendererComponent,
              suppressMenu: true,
              suppressSorting: true,
              cellRenderer: "agAnimateShowChangeCellRenderer",
            });
          }else {
          if (dynamicHeaders.includes(this.finalHeaders[i])) {
              var addCellrendererFramework = false;
              if(responseData.result[0].classifications[0].subClassifications[temp].dataAttributes.length > 0){
                addCellrendererFramework = true;
              }
              else{
                addCellrendererFramework = false;
              }  
              if(addCellrendererFramework){
                this.columnDefs.push({
                  headerName: this.finalHeaders[i],
                  field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
                  width: 300,
                  height: "300px",
                  cellRendererFramework: DynamicHeadersRendererComponent
                  //filter: "agNumberColumnFilter"
                });  
              }
              else{
                this.columnDefs.push({
                  headerName: this.finalHeaders[i],
                  field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
                  width: 300,
                  height: "300px",
                  cellRenderer: "agAnimateShowChangeCellRenderer",
                  //filter: "agNumberColumnFilter"
                });      
              }
              temp++;
          } else {
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              sortable: true,
              filter: true,
              width: 150,
              // onCellValueChanged: function (params){console.log('onCellValueChanged')},
              suppressMenu: true,
              suppressSorting: true,
              cellRenderer: "agAnimateShowChangeCellRenderer",
            });
          }
        }
      }
      console.log("this.columnDefs",this.columnDefs);
    }
    return this.rowData;
  }
  /**===================================== setTableData function end =====================================*/

  /**===================================== onRowClicked function start =====================================*/
  
  /**Row actions on click */
  public onRowClicked(e,currentTabData,dynamicHeaders) {
    console.log("row data",currentTabData.result[e.rowIndex]);
      if (e.event.target !== undefined) {
          let data = e.data;
          let actionType = e.event.target.getAttribute("data-action-type");
          let show_class = e.event.target.className.split(" f-16")[0];
          if(actionType == "edit"){
            console.log("edit.........", e);
          }

          if(actionType == "view"){
            switch(show_class) {
              case "fa fa-eye":
                  return this.onActionViewClick(data,true,e,currentTabData.result[e.rowIndex]);
              case "fa fa-eye-slash":
                  return this.onActionViewClick(data,false,e,currentTabData.result[e.rowIndex]);
            }
          }
          if(actionType == "main-sliders"){
            return this.onSliderChange(data, e,currentTabData.result[e.rowIndex],dynamicHeaders);
          }
          if(actionType = "sliderpop"){
            
          }
      }
  }

  /**===================================== onRowClicked function end =====================================*/
  
  
  /**===================================== onCellClicked function start =====================================*/
  /**Click Function for each cell in the table*/
  public onCellClicked(e,currentTabDataForApi){
    console.log('e: ', e);
    var className = e.event.target.className.split("f-16")[0].trim();
    let actionType = e.event.target.getAttribute("data-action-type");
    if(actionType == 'main-sliders'){
      this.updateSourceByChangingSlider(e,currentTabDataForApi.result[e.rowIndex]);
    }
    else if(actionType == 'edit'){
            this.editDataInitial = $.extend(true, {}, e.data.financial);
            this.editData = e.data.financial;
            console.log('this.editData : ', this.editData );
            let foundIndex = this.mainClassificationData.findIndex((v)=>{
                  return (v.classificationId === this.editData.classifications[0].classificationId);  
            });
            
            this.mainClassificationData[foundIndex] = this.editData.classifications[0];
            this.clsfctn = this.mainClassificationData[0];
            // this.clsfctn = this.editData.classifications[0];
            this.sourcename = this.editData.sourceName;
            this.sourcelink = this.editData.sourceUrl;
            this.selectedDomains = this.editData.sourceDomain;
            this.selectedIndustries = this.editData.sourceIndustry;
            this.selectedJurisdictions = this.editData.sourceJurisdiction;
            this.selectedMedias = this.editData.sourceMedia;
            console.log("edit.........", e);
            this.isEdit = true;
            this.openWindowCustomClass(this.modalContent);
            setTimeout(()=>{
              $(".c-list").mThumbnailScroller({
                axis:"x"
              });
            },0);
    }
  }

  /**===================================== onCellClicked function end =====================================*/


  /**====================== updateSourceByChangingSlider function start =============================*/
  /**Updating the slider value with API call */
  public updateSourceByChangingSlider(e,c_data){
    console.log('e,c_data,dynamic_data: ', e,c_data);
    var currentClassificationData = c_data;
    let currentCrediabilityValueByIndex = e.event.target.value;
    let currentCrediabilityValue = this.credibility_text_map[currentCrediabilityValueByIndex];
    var params:any;
    currentClassificationData.classifications[0].subClassifications.map(function(val){
        val.dataAttributes = [];
        if(val.subClassifcationName == e.colDef.headerName){
          val.subClassificationCredibility = currentCrediabilityValue
        }
    });
    params = currentClassificationData;
    this._sourceManagementService.updateScource(params).subscribe(data => {
      console.log("Success........!");
    },
    (error => {
      console.log(error);
    }));
  }
  /**====================== updateSourceByChangingSlider function end =============================*/

  /**===================================== onActionViewClick function start =====================================*/

  public visibleSourceUpdatedData:any=[];
  public onActionViewClick(data: any,visible, e: any,currentRowData){
    this.visibleSourceUpdatedData = [];
    var updatedClassifications:any=[];
    currentRowData.classifications[0].subClassifications =  currentRowData.classifications[0].subClassifications.map(subClas=>{
      subClas.dataAttributes = [];
      return subClas;
    });

    if(visible){
      var ele = e.event.target.parentElement.parentElement.children;
      for(var i=0; i<ele.length; i++ ){
        var mainDicClass = ele[i].className;
        var crrClass = ele[i].children[0].className.split("f-16")[0].split(' ')[1];
        if(crrClass != "fa-eye")
        ele[i].className = mainDicClass + " disabledRow";
      }
  
      e.event.target.className = "fa fa-eye-slash f-16 text-dark-cream font-16";
      // this.dataService.changeMessage(e.data.visible);
      currentRowData.classifications[0].hideStatusDto.visible = visible;
      updatedClassifications.push(currentRowData.classifications[0]);
      this.visibleSourceUpdatedData = {
        "classifications" : updatedClassifications,
        "deleteMedia" : currentRowData.deleteMedia,
        "entityId" : currentRowData.entityId,
        "sourceCreatedDate" : currentRowData.sourceCreatedDate,
        "sourceDisplayName" : currentRowData.sourceDisplayName,
        "sourceDomain" : [],
        "sourceId" : currentRowData.sourceId,
        "sourceIndustry" : [],
        "sourceJurisdiction" : [],
        "sourceMedia" : [],
        "sourceName" : currentRowData.sourceName,
        "sourceType" : currentRowData.sourceType,
        "sourceUrl" : currentRowData.sourceUrl
      };
    }
    else{
      var ele = e.event.target.parentElement.parentElement.children;
      for(var i=0; i<ele.length; i++ ){
        var mainDivClass = ele[i].className.replace(/ disabledRow/g, "");
        // var mainDivClass = ele[i].className.replace(" disabledRow", "");
        // var crrClass = ele[i].children[0].className.split("f-16")[0].split(' ')[1];
        var crrClass = e.event.target.className.split("f-16")[0].split(' ')[1];
        if(crrClass != "fa-eye")
            ele[i].className = mainDivClass;
      }
      e.event.target.className = "fa fa-eye f-16 text-dark-cream font-16";
      currentRowData.classifications[0].hideStatusDto.visible = visible;
      this.visibleSourceUpdatedData = currentRowData
    }

    var params = this.visibleSourceUpdatedData;
      this._sourceManagementService.updateScource(params).subscribe(data => {
        console.log("Success........!");
      },
      (error => {
        console.log(error);
      }));
    console.log("this.visibleSourceUpdatedData",this.visibleSourceUpdatedData);
}

/**===================================== onActionViewClick function end =====================================*/

public onSliderChange(data: any, e: any,currentTabDataForApi,dynamicHeaders){
    const currentVal = e.event.target.value;
    e.event.target.previousElementSibling.textContent = this.credibility_text_map[currentVal];
}
public getDisplayedColumnsAfter(e: any){
  console.log("getDisplayedColumnsAfter...", e);
}

getSlider(key){
  return '<span class="main-slider-value">'+ key +'</span><input [disabled]="true" type="range" name="points" min="0" max="3" data-action-type="main-sliders" class="range_status '+ key +' " value="'+ this.credibility_digit_map[key] +'">';
}
getEditIcons(key){
  return `<i class="fa fa-edit f-16 text-dark-cream font-16" data-action-type="edit"></i>`
}
onBtExport() {
  var params = {
    skipHeader: false, //getBooleanValue("#skipHeader"),
    columnGroups: false, //getBooleanValue("#columnGroups"),
    skipFooters: false, //getBooleanValue("#skipFooters"),
    skipGroups: false, //getBooleanValue("#skipGroups"),
    skipPinnedTop: false, //getBooleanValue("#skipPinnedTop"),
    skipPinnedBottom: false, //getBooleanValue("#skipPinnedBottom"),
    allColumns: false, //getBooleanValue("#allColumns"),
    onlySelected: false, //getBooleanValue("#onlySelected"),
    suppressQuotes: false, //getBooleanValue("#suppressQuotes"),
    hide: getBooleanValue("#hideColumns"),
    fileName: "CSV_Data",
    processCellCallback: function(
      value,
      node,
      column,
      api,
      columnApi,
      context
    ) {}
  };

  params.processCellCallback = function(params) {
    if (params.value == "All") {
      var vals = "1";
      return (params.value = vals);
    } else {
      return params.value;
    }
  };

  this.gridApi.exportDataAsCsv(params);
}

/**===================================== Add source function start =====================================*/

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
    const modal: NgbModalRef = this.modalService.open(content, { windowClass: 'custom-modal modal-md bst_modal', size: 'lg' });
  }

  modalClose(){
    console.log('dismissed');
    this.modalService.dismissAll();
    this.selectedDomains = [];
    this.selectedJurisdictions = [];
    this.selectedIndustries = [];
    this.selectedMedias = [];
    this.sourcename = '';
    this.sourcelink = '';
  }

  onSubmit(form: NgForm){
    let data = {
      "sourceName": form.value.sourcename,
      "sourceUrl": form.value.sourceLink,
      "sourceDisplayName": form.value.sourcename,
      "entityId": '',
      "sourceType": '',
      "sourceDomain": form.value.domain,
      "sourceIndustry": form.value.industry,
      "sourceJurisdiction": form.value.jurisdiction,
      "classifications": [form.value.classification],
      "sourceMedia": form.value.media,
    };
    this.modalClose();
    
    if(!this.isEdit){
      this._sourceManagementService.addNewSourceAPI(data).subscribe((response)=>{
        console.log('response: ', response);
        this.getAllSources(null);
      });
    }else{
      form.value.classification.subClassifications = form.value.classification.subClassifications.map(subClas=>{
        subClas.dataAttributes = [];
        return subClas;
      });
      let editData = {
        "sourceName": form.value.sourcename,
        "sourceUrl": form.value.sourceLink,
        "sourceDisplayName": form.value.sourcename,
        "entityId": this.editData.entityId,
        "sourceId": this.editData.sourceId,
        "sourceCreatedDate": this.editData.sourceCreatedDate,
        "deleteMedia": this.editData.deleteMedia,
        "sourceType": '',
        "sourceDomain": (JSON.stringify(form.value.domain) === JSON.stringify(this.editDataInitial.sourceDomain))? [] : form.value.domain,
        "sourceIndustry": (JSON.stringify(form.value.industry) === JSON.stringify(this.editDataInitial.sourceIndustry))? [] : form.value.industry,
        "sourceJurisdiction": (JSON.stringify(form.value.jurisdiction) === JSON.stringify(this.editDataInitial.sourceJurisdiction))? [] : form.value.jurisdiction,
        "classifications": [form.value.classification],
        "sourceMedia": (JSON.stringify(form.value.media)=== JSON.stringify(this.editDataInitial.sourceMedia))? [] : form.value.media,
      };
      console.log(editData);
      this._sourceManagementService.updateScource(editData).subscribe((response)=>{
        console.log('response: ', response);
        this.getAllSources(null);
      });
    }
  }

/**===================================== Add source function end =====================================*/

}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}
