import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

// Authservices
import { 
  AuthGuardService as AuthGuard, AuthGuardService 
} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {JwtModule, JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';

// App services
import { LoginService } from './appservice/login.service';
import { ProfileService } from './appservice/profile.service';


const ROUTES :Routes= [
  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:'/login',pathMatch:'full' },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  }
  // { path: '**', redirectTo: '' }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },skipWhenExpired: true,
        whitelistedDomains: ['localhost:3001']}}),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    LoginService,
    AuthGuard,
    AuthService,
    JwtHelperService,
    ProfileService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
