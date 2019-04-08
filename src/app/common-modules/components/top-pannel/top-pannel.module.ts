import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TopPannelComponent } from './top-pannel.component';

const routes : Routes = [
  {
    path:'',
    component:TopPannelComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TopPannelModule { }
