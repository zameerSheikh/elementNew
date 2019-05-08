import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { SourceManagementService } from '../../source-management.service';

@Component({
  selector: 'app-template-renderer',
  templateUrl: './dynamic-headers-renderer.component.html',
  styleUrls: ['./dynamic-headers-renderer.component.scss']
})
export class DynamicHeadersRendererComponent implements OnInit {
  changedSliderValue:any = [];
  mainChangedSliderValue:any = [];
  public sliderValue:any;
  public popoverData:any = [];
  public popoverHeaderData:any = {};
  public dataAttributesForPopover:any = [];
  public temp:any = [];
  public credibility_digit_map:any = {
    NONE: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3
  };
  public credibility_text_map:any = {
    0: "NONE",
    1: "LOW",
    2: "MEDIUM",
    3: "HIGH"
  };

  constructor(private _sourceManagementService:SourceManagementService) { }
  
  agInit(params:any,event): void {
    this.popoverHeaderData = {},
    this.popoverData = [];
    this.dataAttributesForPopover = [];
    this.changedSliderValue = [];
    this.mainChangedSliderValue = [];
    this.popoverData.push(params);
    //console.log('params: ', params);
    this.popoverHeaderData = {
      company_name : this.popoverData[0].data.source ? this.popoverData[0].data.source : '',
      field_name: this.popoverData[0].colDef.headerName ? this.popoverData[0].colDef.headerName : ''
    };
    if(this.popoverData[0] && this.popoverData[0].value){
      var colIndex = this.popoverData[0].value.classifications[0].subClassifications.findIndex(x => x.subClassifcationName === this.popoverData[0].colDef.headerName);
      if(this.popoverData[0].value.classifications[0] && this.popoverData[0].value.classifications[0].subClassifications){
        this.sliderValue = this.popoverData[0].value.classifications[0].subClassifications[colIndex].subClassificationCredibility ? this.popoverData[0].value.classifications[0].subClassifications[colIndex].subClassificationCredibility : '';
        this.mainChangedSliderValue.push(this.credibility_digit_map[this.sliderValue]);

        if(this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes !== undefined && this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes.length > 0){
          this.dataAttributesForPopover = this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes;

          for(let j=0;j<this.dataAttributesForPopover.length;j++){
            this.changedSliderValue.push(this.credibility_digit_map[this.dataAttributesForPopover[j].credibilityValue]);
          };
        }
      }
    }
  }
  
  ngOnInit() {
  }

  mainSliderValueChange(e){
    this.mainChangedSliderValue = [];
    this.changedSliderValue = [];
    const currentValMain = (e.target && e.target.value) ? e.target.value : 0;
    let mainSliderValue = this.credibility_text_map[currentValMain];
    for(let i=0;i<this.dataAttributesForPopover.length;i++){
      this.dataAttributesForPopover[i].credibilityValue = mainSliderValue;
      this.mainChangedSliderValue.push(this.credibility_digit_map[mainSliderValue]);
    };
    this.changedSliderValue = this.mainChangedSliderValue;
  }
  /**Change value onChange of slider from popover */
  sliderValueChangeInPopover(e){
    const currentVal = (e.target && e.target.value) ? e.target.value : 0;
    e.target.previousElementSibling.textContent = this.credibility_text_map[currentVal];
  }

  /**saving the source after updating Credibility in popover*/
  public saveSourceUpdatedData = {};
  saveSource(e){
      this.saveSourceUpdatedData = {};
      this.mainChangedSliderValue = [];
      
      for(let i=0;i<this.changedSliderValue.length;i++){
        var currentSliderValue = this.credibility_text_map[this.changedSliderValue[i]];
        if(currentSliderValue && currentSliderValue !== undefined){
          var sliderIndex = i;
          if(this.popoverData[0] && this.popoverData[0].value && this.popoverData[0].value.classifications[0] && this.popoverData[0].value.classifications[0].subClassifications){
            var colIndex = this.popoverData[0].value.classifications[0].subClassifications.findIndex(ele => ele.subClassifcationName === this.popoverData[0].colDef.headerName);
            
            if(this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes[sliderIndex]){
              this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes[sliderIndex].credibilityValue =  currentSliderValue;
            }
            if(this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes){
            var currentDataAttributes = this.popoverData[0].value.classifications[0].subClassifications[colIndex].dataAttributes;
              for(let j=0;j<currentDataAttributes.length;j++){
                if(currentDataAttributes[j].credibilityValue === currentSliderValue){
                  this.sliderValue = currentSliderValue
                }
                else{
                  this.sliderValue = "NONE";
                  this.mainChangedSliderValue.push(0);
                  break;
                }    
              }
            }
          }
        }
      }
      this.saveSourceUpdatedData = {
        "classifications" : this.popoverData[0].value.classifications,
        "deleteMedia" : this.popoverData[0].value.deleteMedia,
        "entityId" : this.popoverData[0].value.entityId,
        "sourceCreatedDate" : this.popoverData[0].value.sourceCreatedDate,
        "sourceDisplayName" : this.popoverData[0].value.sourceDisplayName,
        "sourceDomain" : [],
        "sourceId" : this.popoverData[0].value.sourceId,
        "sourceIndustry" : [],
        "sourceJurisdiction" : [],
        "sourceMedia" : [],
        "sourceName" : this.popoverData[0].value.sourceName,
        "sourceType" : this.popoverData[0].value.sourceType,
        "sourceUrl" : this.popoverData[0].value.sourceUrl
      };

      var params = this.saveSourceUpdatedData;
      this._sourceManagementService.updateScource(params).subscribe(data => {
        console.log("Success........!");
      },
      (error => {
        console.log(error);
      }));
      console.log('this.saveSourceUpdatedData: ',this.saveSourceUpdatedData);
    }

  // getSlider(key){
  //   return '<span>'+ key +'</span><input [disabled]="true" type="range" name="points" min="0" max="3" data-action-type="main-sliders" class="range_status '+ key +' " value="'+ this.credibility_digit_map[key] +'">';
  // }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
