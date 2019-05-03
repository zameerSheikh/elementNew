import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { SourceManagementComponent } from './source-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
  {
    path:'',
    component:SourceManagementComponent
  }
];
@NgModule({
  declarations: [SourceManagementComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    AngularMultiSelectModule,
    AgGridModule.withComponents([SourceManagementComponent]),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SourceManagementModule { }
