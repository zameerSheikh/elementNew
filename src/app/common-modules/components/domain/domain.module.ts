import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    RouterModule.forChild(routes)
  ]
})
export class DomainModule { }
