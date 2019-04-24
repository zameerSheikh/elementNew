import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { Routes, RouterModule } from '@angular/router';
import { DomainComponent } from './domain.component';

const routes: Routes = [
  {
    path:'',
    component:DomainComponent
  }
];
@NgModule({
  declarations: [DomainComponent],
  imports: [
    CommonModule,
    NgbModule,
    DragDropModule,
    FormsModule,
    AngularMultiSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class DomainModule { }
