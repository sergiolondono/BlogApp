import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {

  data: any;
  endpoint = environment.APIEndpoint + 'WeatherForecast';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getWeather() {
  console.log('getWeather', this.endpoint);
  let token = localStorage.getItem('token');
  console.log('getWeather', token);
   return this.http.get(this.endpoint).pipe(
      map(this.extractData));
  }

  handle_Error(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      console.log(`status: ${error.status} Message: ${error.error.ExceptionMessage}`);
      errorMessage = `\n${error.error.ExceptionMessage}`;
    }
    return throwError(errorMessage);
  }

}
