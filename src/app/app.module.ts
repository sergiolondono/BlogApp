import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AddHeaderInterceptor } from './services/addheaderinterceptor';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent} from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import {StatePipe} from './shared/state.pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'all', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    HomeComponent,
    StatePipe
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true
  },
  StatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
