import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ComplianceComponent } from './compliance/compliance.component';

@NgModule({
  declarations: [OverviewComponent, ComplianceComponent],
  imports: [
    CommonModule,
    EntityRoutingModule
  ]
})
export class EntityModule { }
