import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopPannelComponent } from './common-modules/components/top-pannel/top-pannel.component';
import { PageNotFoundComponentComponent } from './pageNotFoundComponent/page-not-found-component.component';
import { AppConstants } from "./app.constant";
import { StickyNotesComponent } from './common-modules/components/top-pannel/sticky-notes/sticky-notes.component';
@NgModule({
  declarations: [
    AppComponent,
    TopPannelComponent,
    PageNotFoundComponentComponent,
    StickyNotesComponent
  ],
  imports: [
    BrowserModule,                                                                                                                            
    HttpClientModule,
    NgbModule,
    DragDropModule,
    AppRoutingModule,
    
  ],
  providers: [AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
