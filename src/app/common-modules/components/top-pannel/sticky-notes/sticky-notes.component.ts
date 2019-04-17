import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.scss']
})
export class StickyNotesComponent implements OnInit {

  constructor() { }

  @Input() showSticky:  boolean;

  ngOnInit() {
  }

}
