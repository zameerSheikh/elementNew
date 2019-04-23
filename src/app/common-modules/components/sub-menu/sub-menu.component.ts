import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'custom-modal modal-md bst_modal', size: 'lg' });
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

}
