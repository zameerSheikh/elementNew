import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SubMenuComponent } from './sub-menu.component';

const routes : Routes = [
  {
    path:'',
    component:SubMenuComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubMenuComponent]
})
export class SubmenuModule { }
