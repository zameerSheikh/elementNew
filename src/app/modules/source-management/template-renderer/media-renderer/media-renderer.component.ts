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
    this.popoverHeaderData = {};
    this.popoverMediaData = [];
    this.popoverMediaData.push(params);
    if(params.value){
      this.rowDataResponse = this.popoverMediaData[0].value[0];
      this.mediaListForHeader = this.popoverMediaData[0].value[1].sort((a,b) => (a.mediaName > b.mediaName) ? 1 : ((b.mediaName > a.mediaName) ? -1 : 0));

      this.popoverHeaderData = {
        company_name : this.popoverMediaData[0].data.source,
        field_name : this.popoverMediaData[0].colDef.headerName
      }
    }
    console.log(params);
  };

  constructor() { }

  ngOnInit() {
  }

}
