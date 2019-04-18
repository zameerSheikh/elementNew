import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit} from "@angular/core";
import { SourceManagementService } from './source-management.service';
import { AgGridNg2 } from "ag-grid-angular";
import { GridOptions } from 'ag-grid-community';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
//import "ag-grid-enterprise/main";
//import { TemplateRendererComponent } from './template-render/template-renderer.component';


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
 // @ViewChild('greetCell') greetCell: TemplateRef<any>;
  private responseData:any = [];
  private totallSourceCount:number = 0;
  private staticHeaders1 = [
    "Source",
    "Link",
    "Domain",
    "Industry",
    "Jurisdiction"
  ];
  private staticHeaders2:any = ["Media", "Visible", "Edit"];
  private dynamicHeaders:any = [];
  public getRowHeight;
  private gridApi:any;
  private gridColumnApi:any;
  public columnDefs:any = [];
  public defaultColDef:any;
  private sortingOrder:any;
  private paginationPageSize:any; 
  private dynamicDefs:any;
  public rowData:any = [];
  private finalHeaders:any = [];
  public mainClassificationData:any = [];
  private visible:any;
  private fisrtCall:Boolean = false;
  private credibility_digit_map:any = {
    NONE: "0",
    LOW: "1",
    MEDIUM: "2",
    HIGH: "3"
  };
  private disabledCell:boolean = false;
  private credibility_text_map:any = {
    0: "NONE",
    1: "LOW",
    2: "MEDIUM",
    3: "HIGH"
  };
  mouseHandler: any;
  private params = {
    "recordsPerPage":10,
    "pageNumber":1,
    "classificationId":2651660,
    "orderBy":'',
    "orderIn":'',
    "subSlassificationId":'',
    "visible":'',
  }

  private recordsPerPage:number = 10;
  private pageNum:number = 1;
  
  constructor(private _sourceManagementService:SourceManagementService,config: NgbTabsetConfig) {
    config.type = 'pills';
    config.justify = 'fill';
    
    this.defaultColDef = {
      resizable: true,
      filter: true
    };
    this.paginationPageSize = 50;
    this.getRowHeight = function(params) {
      if (params.node.level === 0) {
        return 40;
      } else {
        return 25;
      }
    };
  }
  ngOnInit() {
  }

  getClassifications(){
    this._sourceManagementService.getClassificationsForScource().subscribe(data => {
      this.mainClassificationData = data;
    },
    (error => {
      console.log(error);
    }))
  }


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
            this.totallSourceCount = newsRespData.paginationInformation.totalResults;
          }else if(values.classifcationName == 'INDEX'){
            indexRespData = data;
            this.totallSourceCount = indexRespData.paginationInformation.totalResults;
          }
          return this.responseData;
        })
    }
    else if(generalRespData && values.classifcationName == 'GENERAL'){
      this.setTableData(generalRespData);
      this.totallSourceCount = generalRespData.paginationInformation.totalResults;
    }else if(newsRespData && values.classifcationName == 'NEWS'){
      this.setTableData(newsRespData);
      this.totallSourceCount = newsRespData.paginationInformation.totalResults;
    }else if(indexRespData && values.classifcationName == 'INDEX'){
      this.setTableData(indexRespData);
      this.totallSourceCount = indexRespData.paginationInformation.totalResults;
    }
  }
  tabChange(index,values){
    this.fisrtCall = true;
    this.responseData = [];
    this.getSources(values);
  }
  
  /**Getting data from get source api */
  onGridReady(params1){
    this.getClassifications();
    this.gridApi = params1.api;
    this.gridColumnApi = params1.gridColumnApi;
    if(this.fisrtCall == false){
      this._sourceManagementService.getAllSourcesData(this.params).subscribe(data => {
        this.responseData = data;
        this.setTableData(this.responseData);
        generalRespData = data;
        this.totallSourceCount = generalRespData.paginationInformation.totalResults;
        params1.api.setColumnDefs(this.columnDefs);
        params1.api.setRowData(this.rowData);
      });
    }
  }

  setTableData(responseData){
    console.log('responseData==============>: ', responseData);
    this.columnDefs = [];
    this.rowData = [];
    if(responseData && responseData.result){
      /**Setting dynamic headers */
      var tempVal = responseData.result[0].classifications[0].subClassifications;
      var dynamicHeaders = [];
      for (var i = 0; i < tempVal.length; i++) {
        dynamicHeaders[i] = tempVal[i].subClassifcationName;
      }
  
      this.finalHeaders = this.staticHeaders1
          .concat(dynamicHeaders)
          .concat(this.staticHeaders2);
      console.log("this.finalHeaders",this.finalHeaders);
      for (var i = 0; i < this.finalHeaders.length; i++) {
          if(this.finalHeaders[i] == "Media"){
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 200,
              //cellRendererFramework: TemplateRendererComponent,
              suppressMenu: true,
              suppressSorting: true,
              template:
                `
                <i class="fa fa-file-word-o text-dodger-blue2 mar-r5 f-10" data-action-type="sliders"></i>
                <i class="fa fa-file-excel-o text-dark-pastal-green mar-r5 f-10" data-action-type="sliders"></i>
                <i class="fa fa-file-powerpoint-o text-coral-red mar-r5 f-10" data-action-type="sliders"></i>
                <i class="fa fa-file-pdf-o text-coral-red mar-r5 f-10" data-action-type="sliders"></i>
                <i class="fa fa-file-video-o text-deep-lilac mar-r5 f-10" data-action-type="sliders"></i>
                <i class="fa fa-file-audio-o text-tealish-blue mar-r5 f-10" data-action-type="sliders"></i>
                <i class="fa fa-sliders f-16 text-dark-cream font-16" data-action-type="sliders"></i>
                `
            });
          } else if(this.finalHeaders[i] == "Visible"){
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 200,
              //cellRendererFramework: TemplateRendererComponent,
              suppressMenu: true,
              suppressSorting: true,
              template:
              `<i class="fa fa-eye f-16 text-dark-cream font-16" data-action-type="view"></i>`,
              cellClassRules: {
                // 'disabledRow': params => {
                  // console.log(params)
                  //  if (params.colDef.field === this.finalHeaders[i].toLowerCase().replace(/ /g, "_") &&
                      //  params.data["previousField"] === "value") {
                      // return true;
                  //  } else {
                      // return false;
                  //  }
                // },
                // 'your-other-css-class': params => {return false}
            }
            });
          } else if(this.finalHeaders[i] == "Edit"){
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 150,
              //cellRendererFramework: TemplateRendererComponent,
              suppressMenu: true,
              suppressSorting: true,
              cellRenderer: "agAnimateShowChangeCellRenderer",
              // template:
              //   `<i class="fa fa-edit f-16 text-dark-cream font-16" data-action-type="edit"></i>`,
              //   cellClassRules: {
              //     'disabledRow': params => {
              //       if (params.colDef.field && params.data["visible"] === "False" && this.visible === "False") {
              //           return true;
              //        } else {
              //           return false;
              //        }
              //     },
              //     'your-other-css-class': params => {return false}
              //  }
            });
          }else {
          if (this.finalHeaders[i].indexOf(dynamicHeaders) == -1) {
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              width: 300,
              height: "300px",
              cellRenderer: "agAnimateShowChangeCellRenderer",
              //filter: "agNumberColumnFilter"
            });
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
              cellClassRules: {
                  // 'disabledRow': params => {
                  //   console.log(params, "...params")
                    // if (params.colDef.field && params.data["visible"] === "False" && this.visible === "False") {
                    //     return true;
                    //  } else {
                    //     return false;
                    //  }
                  // },
                  // 'your-other-css-class': params => {return false}
              }
            });
          }
        }
      }
      console.log("this.columnDefs",this.columnDefs);
      /* Create Dynamic Final Header */

      var dynamicHeadersCredibility = {};
      var finalStaticHeadersData = [];
      var secondStaticHeadersData = {};
      for(let i=0;i<responseData.result.length;i++){
          dynamicHeadersCredibility = {};
          finalStaticHeadersData = [];
        if(responseData.result[i].sourceDomain && responseData.result[i].sourceIndustry && responseData.result[i].sourceJurisdiction){
          finalStaticHeadersData.push({
            source: responseData.result[i].sourceName = responseData.result[i].sourceName ? responseData.result[i].sourceName :'',
            link: '<a href="'+(responseData.result[i].sourceUrl = responseData.result[i].sourceUrl ? responseData.result[i].sourceUrl : "")+'" target="_blank">'+(responseData.result[i].sourceUrl = responseData.result[i].sourceUrl ? responseData.result[i].sourceUrl : "")+'</a>',
            domain: responseData.result[i].sourceDomain.map(a => {return (a.domainName = a.domainName ? a.domainName : '')}),
            industry: responseData.result[i].sourceIndustry.map(a => {return (a.industryName = a.industryName ? a.industryName : '')}),
            jurisdiction: responseData.result[i].sourceJurisdiction.map(a => {return (a.jurisdictionName = a.jurisdictionName ? a.jurisdictionName : '')})
          });  
        }
        secondStaticHeadersData = {
          media: "All",
          visible: "True",
          edit: this.getEditIcons(" ")
        }
        if(responseData.result[i].classifications[0] && responseData.result[i].classifications[0].subClassifications){
          for(let j=0;j<responseData.result[i].classifications[0].subClassifications.length;j++){
            if(responseData.result[i].classifications[0].subClassifications[j].subClassifcationName && responseData.result[i].classifications[0].subClassifications[j].subClassificationCredibility){
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
    }
    return this.rowData;
  }
  getSlider(key){
    return '<span>'+ key +'</span><input [disabled]="true" type="range" name="points" min="0" max="3" data-action-type="main-sliders" class="range_status '+ key +' " value="'+ this.credibility_digit_map[key] +'">'
  }

  getEditIcons(key){
    return `<i class="fa fa-edit f-16 text-dark-cream font-16" data-action-type="edit"></i>`
  }

  /**Row actions on click */
  public onRowClicked(e) {
      if (e.event.target !== undefined) {
          let data = e.data;
          let actionType = e.event.target.getAttribute("data-action-type");
          let show_class = e.event.target.className.split(" f-16")[0];
          if(actionType == "edit"){
            console.log("edit.........", e)
          }

          if(actionType == "view"){
            switch(show_class) {
              case "fa fa-eye":
                  return this.onActionViewClick(data, e);
              case "fa fa-eye-slash":
                  return this.onActionRemoveClick(data, e);
            }
          }

          if(actionType == "main-sliders"){
            return this.onSliderChange(data, e);
          }
      }
  }

  public onActionViewClick(data: any, e: any){
    
    var ele = e.event.target.parentElement.parentElement.children;
    for(var i=0; i<ele.length; i++ ){
      var mainDicClass = ele[i].className;
      var crrClass = ele[i].children[0].className.split("f-16")[0].split(' ')[1];
      if(crrClass != "fa-eye")
      ele[i].className = mainDicClass + " disabledRow";
    }

    e.event.target.className = "fa fa-eye-slash f-16 text-dark-cream font-16";
    // this.dataService.changeMessage(e.data.visible);
    console.log("onActionViewClick...", e, this.visible);
}

public onActionRemoveClick(data: any, e: any){

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
  // this.dataService.changeMessage(e.data.visible);
  console.log("onActionRemoveClick...", e, this.visible);
}

public onSliderChange(data: any, e: any){
    const currentVal = e.event.target.value;
    e.event.target.previousElementSibling.textContent = this.credibility_text_map[currentVal];
}
public getDisplayedColumnsAfter(e: any){
  console.log("getDisplayedColumnsAfter...", e);
}
 getAllColumns(e: any){
  console.log("getAllColumns()...", e);
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

}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}
