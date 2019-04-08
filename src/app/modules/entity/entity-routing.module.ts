import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { ComplianceComponent } from './compliance/compliance.component';

const routes: Routes = [
  {
    path:'overview',
    component:OverviewComponent
  },
  {
    path:'compliance',
    component:ComplianceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
