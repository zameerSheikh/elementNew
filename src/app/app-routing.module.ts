import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponentComponent } from './pageNotFoundComponent/page-not-found-component.component';

const routes: Routes = [
  {
    path: 'ehubui', children: [
      {
        path: 'domain',
        loadChildren: './common-modules/components/domain/domain.module#DomainModule'
      },
      {
        path: 'submenu',
        loadChildren: './common-modules/components/sub-menu/submenu.module#SubmenuModule'
      },
      {
        path: 'toppannel',
        loadChildren: './common-modules/components/top-pannel/top-pannel.module#TopPannelModule'
      },
      {
        path: 'entity',
        loadChildren: './modules/entity/entity.module#EntityModule'
      }
    ]
  },
  { path: '', redirectTo: 'ehubui/domain', pathMatch: 'full'},
  { path: '**', component:PageNotFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
