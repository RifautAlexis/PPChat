import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ChatListComponent } from '@shared/components/chat-list/chat-list.component';
import { RegisterComponent } from '@shared/components/register/register.component';
import { HomeComponent } from '@shared/components/home/home.component';
import { LoginComponent } from '@shared/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chats',
    component: ChatListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class RoutingModule { }
