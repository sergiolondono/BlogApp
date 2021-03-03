import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { WeatherforecastService } from './services/weatherforecast.service';
import { Weather } from './models/weather';
import { PostsService } from './services/posts.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { CommentsService } from './services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogApp';
  showCommentById: string;
  postSelected: any;

  constructor(private router: Router) 
    { }

  logout()
  {
    console.log("Logout");
    localStorage.clear();
    sessionStorage.clear();    
    this.router.navigateByUrl('/');
  }

}
