import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-renderer',
  templateUrl: './template-renderer.component.html',
  styleUrls: ['./template-renderer.component.scss']
})
export class TemplateRendererComponent implements OnInit {
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
  
  agInit(params:any,event): void {
    this.popoverHeaderData = {},
    this.popoverData = [];
    this.dataAttributesForPopover = [];
    this.popoverData.push(params);
    //console.log('params: ', params);
    this.popoverHeaderData = {
      company_name : this.popoverData[0].data.source ? this.popoverData[0].data.source : '',
      field_name: this.popoverData[0].colDef.headerName ? this.popoverData[0].colDef.headerName : ''
    };
    if(this.popoverData[0].value && this.popoverData[0].value.dataAttributes !== undefined && this.popoverData[0].value.dataAttributes.length > 0){
      this.dataAttributesForPopover = this.popoverData[0].value.dataAttributes;
    }
    if(this.popoverData[0].value){
      this.sliderValue = this.popoverData[0].value.subClassificationCredibility ? this.popoverData[0].value.subClassificationCredibility : '';
    }
  }
  constructor() { }
  ngOnInit() {
  }

  /**Change value onChange of slider from popover */
  sliderValueChangeInPopover(e){
    const currentVal = (e.target && e.target.value) ? e.target.value : 0;
    e.target.previousElementSibling.textContent = this.credibility_text_map[currentVal];
    this.temp.push({
      value: this.credibility_text_map[currentVal]
    })
    console.log("On change=======>",this.temp);
  }

  // getSlider(key){
  //   return '<span>'+ key +'</span><input [disabled]="true" type="range" name="points" min="0" max="3" data-action-type="main-sliders" class="range_status '+ key +' " value="'+ this.credibility_digit_map[key] +'">';
  // }
}
