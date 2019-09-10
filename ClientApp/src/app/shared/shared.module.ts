import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  MatGridListModule,
  MatListModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddThreadComponent } from './components/add-thread/add-thread.component';

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
    SideMenuComponent,
    ContactComponent,
    AddThreadComponent,
    PrintSpeakersPipe,
    ThreadFilterPipe
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    AddThreadComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HomeComponent,
    MatDialogModule
  ]
})

export class SharedModule { }
