import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';

import { SharedModule } from '@shared/shared.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      RoutingModule,
      CoreModule,
      BrowserAnimationsModule,
      SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
