import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-renderer',
  templateUrl: './media-renderer.component.html',
  styleUrls: ['./media-renderer.component.scss']
})
export class MediaRendererComponent implements OnInit {
  public popoverHeaderData:any = {};
  public popoverMediaData:any = [];
  public rowDataResponse:any = [];
  public mediaListForHeader:any = [];
  public checklist:any = [];
  public allSelected:boolean;

  public mapMediaHash = {
        Doc: 'file-word-o text-dodger-blue2',
        Excel: 'file-excel-o text-dark-pastal-green',
        PPT: 'file-powerpoint-o text-coral-red',
        PDF: 'file-pdf-o text-coral-red',
        Movies: 'file-video-o text-deep-lilac',
        Audio: 'file-audio-o text-tealish-blue',
        Screenshot :'crop',
        All:"files-o"
    };
  agInit(params:any,event): void {
    console.log('params: ', params);
    this.popoverHeaderData = {};
    this.popoverMediaData = [];
    this.popoverMediaData.push(params);
    // let selectedMedias = params.data.financial.sourceMedia;
    let selectedMedias = params.value[0].sourceMedia;
    console.log('selectedMedias: ', selectedMedias);
    let toSelectAllMedia = selectedMedias.some(media => media.mediaName === 'All');
    if(params.value){
      this.rowDataResponse = this.popoverMediaData[0].value[0];
      this.mediaListForHeader = this.popoverMediaData[0].value[1].sort((a,b) => (a.mediaName > b.mediaName) ? 1 : ((b.mediaName > a.mediaName) ? -1 : 0));
      this.mediaListForHeader = this.mediaListForHeader
      .filter(obj =>{
        return obj.mediaName !== 'All';
      })
      .map(obj => {
                if(toSelectAllMedia){
                  obj['isSelected'] = true;
                  this.allSelected = true;
                }else{
                  let isInSelectedMedias = selectedMedias.some(mObj => {
                    return JSON.stringify(mObj) === JSON.stringify(obj);
                  });

                  if(isInSelectedMedias){
                    obj['isSelected'] = true;
                  }else{
                    obj['isSelected'] = false;
                  }
                }
               return obj;
      });

      console.log('this.mediaListForHeader: ', this.mediaListForHeader);
      this.popoverHeaderData = {
        company_name : this.popoverMediaData[0].data.source,
        field_name : this.popoverMediaData[0].colDef.headerName
      }
    }
    console.log(params);
  };

  constructor() { }

  ngOnInit() {

    this.checklist = [
      {id:1,value:'Elenor Anderson',isSelected:false},
      {id:2,value:'Caden Kunze',isSelected:true},
      {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
      {id:4,value:'Grady Reichert',isSelected:false},
      {id:5,value:'Dejon Olson',isSelected:false},
      {id:6,value:'Jamir Pfannerstill',isSelected:false},
      {id:7,value:'Aracely Renner DVM',isSelected:false},
      {id:8,value:'Genoveva Luettgen',isSelected:false}
    ];
  }

  checkUncheckAll() {
    for (var i = 0; i < this.mediaListForHeader.length; i++) {
      this.mediaListForHeader[i].isSelected = this.allSelected;
    }
  }
  isAllSelected() {
    this.allSelected = this.mediaListForHeader.every(function(item:any) {
        return item.isSelected == true;
      })
  }

}
