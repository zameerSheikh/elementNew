import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit} from "@angular/core";
import { SourceManagementService } from './source-management.service';
import { AgGridNg2 } from "ag-grid-angular";
import { GridOptions } from 'ag-grid-community';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
//import { TemplateRendererComponent } from './template-render/template-renderer.component';


var responseData:any = [];
@Component({
  selector: 'app-source-management',
  templateUrl: './source-management.component.html',
  styleUrls: ['./source-management.component.scss']
})
export class SourceManagementComponent implements OnInit {
  @ViewChild("agGrid") agGrid: AgGridNg2;
 // @ViewChild('greetCell') greetCell: TemplateRef<any>;

  private staticHeaders1 = [
    "Source",
    "Link",
    "Domain",
    "Industry",
    "Jurisdiction"
  ];
  private staticHeaders2:any = ["Media", "Visible", "Edit"];
  private dynamicHeaders:any = [];
  private gridApi:any;
  private gridColumnApi:any;
  private columnDefs:any = [];
  private defaultColDef:any;
  private sortingOrder:any;
  private paginationPageSize:any; 
  private dynamicDefs:any;
  private rowData:any = [];
  private finalHeaders:any = [];
  private visible:any;
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

  constructor(private _sourceManagementService:SourceManagementService,config: NgbTabsetConfig) {
    config.type = 'pills';
    config.justify = 'fill';
  }
  ngOnInit() {
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
  /**Getting data from get source api */
  onGridReady(params1){
    this.gridApi = params1.api;
    this.gridColumnApi = params1.gridColumnApi;

    this._sourceManagementService.getTableData(this.params).subscribe(data => {
      responseData = data;
      var rowData = this.setTableData(responseData);
      console.log("responseData",responseData,rowData);
      params1.api.setColumnDefs(this.columnDefs);
      params1.api.setRowData(rowData);
    });
  }

  setTableData(responseData){
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
              width: 100,
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
              width: 100,
              //cellRendererFramework: TemplateRendererComponent,
              suppressMenu: true,
              suppressSorting: true,
              //cellRenderer: "agAnimateShowChangeCellRenderer",
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
              width: 250,
              height: "300px",
              //cellRenderer: "agAnimateShowChangeCellRenderer",
              //filter: "agNumberColumnFilter"
            });
          } else {
            this.columnDefs.push({
              headerName: this.finalHeaders[i],
              field: this.finalHeaders[i].toLowerCase().replace(/ /g, "_"),
              sortable: true,
              filter: true,
              width: 200,
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
    for (var i = 0; i < responseData.result.length; i++) {
      var comp_info =
        responseData.result[i].classifications[0].subClassifications[0]
          .subClassificationCredibility;
      var fin =
        responseData.result[i].classifications[0].subClassifications[0]
          .subClassificationCredibility;
      var corp_struc =
        responseData.result[i].classifications[0].subClassifications[0]
          .subClassificationCredibility;
      var social_med =
        responseData.result[i].classifications[0].subClassifications[0]
          .subClassificationCredibility;

      var domain = responseData.result[i].sourceDomain.map(a => a.domainName);
      var industry = responseData.result[i].sourceIndustry.map(a => a.industryName);
      var jurisdiction = responseData.result[i].sourceJurisdiction.map(
        a => a.jurisdictionName
      );

      this.rowData.push({
          source: responseData.result[i].sourceName,
          link: responseData.result[i].sourceUrl,
          domain: domain,
          industry: industry,
          jurisdiction: jurisdiction,
          company_information: this.getSlider(comp_info),
          financial: this.getSlider(fin),
          corporate_structure: this.getSlider(corp_struc),
          social_media: this.getSlider(social_med),
          media: "All",
          visible: "True",
          edit: this.getEditIcons(comp_info),
        });
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

}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}
