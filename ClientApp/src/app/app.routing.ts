import { ChatListComponent } from './Componnents/chat-list/chat-list.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Componnents/register/register.component';
import { HomeComponent } from './Componnents/home/home.component';
import { LoginComponent } from './Componnents/login/login.component';

export const routes: Routes = [
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

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
