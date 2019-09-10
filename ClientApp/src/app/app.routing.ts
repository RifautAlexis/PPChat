import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ChatListComponent } from '@shared/components/chat-list/chat-list.component';
import { RegisterComponent } from '@shared/components/register/register.component';
import { HomeComponent } from '@shared/components/home/home.component';
import { LoginComponent } from '@shared/components/login/login.component';
import { ContactComponent } from '@shared/components/contact/contact.component';
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';

import { AuthGuard } from '@core/interceptors/auth.guard';

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
    path: 'me',
    component: SideMenuComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: 'contacts',
        component: ContactComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'contacts/:username',
        component: ContactComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: '',
        component: ChatListComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'chats',
        component: ChatListComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'chats/:threadId',
        component: ChatListComponent,
        canActivate: [ AuthGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class RoutingModule { }
