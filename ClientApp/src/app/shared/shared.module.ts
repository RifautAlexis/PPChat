import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from '@shared/components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { SettingComponent } from './components/setting/setting.component';

import { PrintSpeakersPipe } from './pipes/PrintSpeakers.pipe';
import { ThreadFilterPipe } from './pipes/ThreadFilter.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    ChatComponent,
    ChatListComponent,
    NavMenuComponent,
    SearchUserComponent,
    SideMenuComponent,
    ContactComponent,
    SettingComponent,
    PrintSpeakersPipe,
    ThreadFilterPipe
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NavMenuComponent,
    HomeComponent
  ]
})

export class SharedModule { }
