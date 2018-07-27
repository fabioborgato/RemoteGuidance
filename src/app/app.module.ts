import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatMenuModule, MatIconModule, MatButtonModule} from '@angular/material';
import {MatMenuContent} from '@angular/material';
import {MatMenu} from '@angular/material';
import {MatMenuItem} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

import { TopNavComponent } from './technician/top-nav/top-nav.component';
import { InterventiComponent } from './technician/interventi/interventi.component';
import { LoginComponent } from './technician/login/login.component';
import { UsersComponent } from './technician/users/users.component';
import { ChatComponent } from './technician/chat/chat.component';
import { VideoChatComponent } from './technician/video-chat/video-chat.component';

import { TopNavOperatorComponent } from './operator/top-nav/top-nav.component';
import { RegisterComponent } from './operator/register/register.component';
import { LoginOperatorComponent } from './operator/login/login.component';
import { PostRegistrationComponent } from './operator/post-registration/post-registration.component';
import { DashboardComponent } from './operator/dashboard/dashboard.component';
import { ChatOperatorComponent } from './operator/chat/chat.component';
import { VideoChatOperatorComponent } from './operator/video-chat/video-chat.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AddInterventoComponent } from './technician/add-intervento/add-intervento.component';
import { MobileChatComponent } from './technician/mobile-chat/mobile-chat.component';
import { MobileChatOpComponent } from './operator/mobile-chat/mobile-chat.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 9999
}};

export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}

const appRoutes: Routes = [
      // User routes
      { path: 'auth/user/login',  component: LoginOperatorComponent },
      { path: 'auth/user/register',  component: RegisterComponent },
      // tslint:disable-next-line:max-line-length
      { path: 'auth/user/complete-registration', component: PostRegistrationComponent, canActivate: [RoleGuard], data: { expectedRole: 'user' }},
      { path: 'user/chat',  component: ChatOperatorComponent,  canActivate: [RoleGuard], data: { expectedRole: 'user' }},
      { path: 'user/video-chat',  component: RegisterComponent,  canActivate: [RoleGuard], data: { expectedRole: 'user' }},
      { path: 'user/dashboard',  component: DashboardComponent,  canActivate: [RoleGuard], data: { expectedRole: 'user' }},
      { path: 'user/chatmobile',  component: MobileChatOpComponent, canActivate: [RoleGuard], data: {  expectedRole: 'user' }   },

      // Admin routes
      { path: 'auth/admin/login', component: LoginComponent },
      { path: 'admin/chat',  component: ChatComponent, canActivate: [RoleGuard], data: {  expectedRole: 'admin' }   },
      { path: 'admin/chatmobile',  component: MobileChatComponent, canActivate: [RoleGuard], data: {  expectedRole: 'admin' }   },
      { path: 'admin/addIntervento',  component: AddInterventoComponent, canActivate: [RoleGuard], data: {  expectedRole: 'admin' }   },
      { path: 'admin/video-chat:',  component: VideoChatComponent,  canActivate: [RoleGuard], data: {  expectedRole: 'admin' }  },
      { path: 'admin/users',  component: UsersComponent, canActivate: [RoleGuard], data: {  expectedRole: 'admin' }   },
      { path: 'admin/interventi',  component: InterventiComponent,  canActivate: [RoleGuard], data: {  expectedRole: 'admin' }    },

      { path: '',
        redirectTo: 'auth/user/login',
        pathMatch: 'full'
  },
      { path: '**',
            redirectTo: 'auth/user/login',
            pathMatch: 'full'
      }
  ];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopNavComponent,
    InterventiComponent,
    UsersComponent,
    RegisterComponent,
    LoginOperatorComponent,
    PostRegistrationComponent,
    DashboardComponent,
    TopNavOperatorComponent,
    ChatComponent,
    ChatOperatorComponent,
    VideoChatComponent,
    VideoChatOperatorComponent,
    AddInterventoComponent,
    MobileChatComponent,
    MobileChatOpComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatMenuModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    }),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    SocketIoModule.forRoot(config),
    MatButtonModule,
    MatIconModule
  ],
  exports: [MatMenu, MatMenuItem, MatMenuContent],
  providers: [ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
