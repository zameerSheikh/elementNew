import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    RouterModule.forChild(routes)
  ]
})
export class DomainModule { }
