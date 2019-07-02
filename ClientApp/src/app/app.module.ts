import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing as Routing } from './app.routing';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Componnents/nav-menu/nav-menu.component';
import { HomeComponent } from './Componnents/home/home.component';
import { RegisterComponent } from './Componnents/register/register.component';
import { LoginComponent } from './Componnents/login/login.component';
import { AlertComponent } from './Componnents/alert/alert.component';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      AlertComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      Routing
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
