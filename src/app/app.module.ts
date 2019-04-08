import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopPannelComponent } from './common-modules/components/top-pannel/top-pannel.component';
import { PageNotFoundComponentComponent } from './pageNotFoundComponent/page-not-found-component.component';
import { AppConstants } from "./app.constant";

@NgModule({
  declarations: [
    AppComponent,
    TopPannelComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    
  ],
  providers: [AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
