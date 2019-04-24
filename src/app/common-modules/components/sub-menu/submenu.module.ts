import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Routes, RouterModule } from '@angular/router';

// const routes : Routes = [
//   {
//     path:'',
//     component:SubMenuComponent
//   }
// ]
@NgModule({
  imports: [
    CommonModule,
    AngularMultiSelectModule
    // RouterModule.forChild(routes)
  ],
  declarations: []
})
export class SubmenuModule { }
