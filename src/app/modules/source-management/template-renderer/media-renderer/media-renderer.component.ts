import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-renderer',
  templateUrl: './media-renderer.component.html',
  styleUrls: ['./media-renderer.component.scss']
})
export class MediaRendererComponent implements OnInit {

  agInit(params:any,event): void {
    console.log(params);
  };

  constructor() { }

  ngOnInit() {
  }

}
