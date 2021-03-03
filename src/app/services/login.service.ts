import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{

  data: any;
  endpoint = environment.APIEndpoint + 'Login/Login';
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.clearLocalStorageApp();
  }

  clearLocalStorageApp(){
    localStorage.removeItem('initConfig');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  login(email, password) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    console.log('service');
    let credentials = {
      Email: email,
      Password: password
    };
    var userInfo = JSON.stringify(credentials);
    return this.http.post(this.endpoint, userInfo, httpOptions).subscribe(
      data => {
        this.data = data;
        let jwtJson = JSON.parse(atob(this.data.token.split('.')[1]));
        console.log("jwtJson: ", jwtJson);
        console.log("rol: ", jwtJson['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

        console.log('POST Request is successful', data);
        localStorage.setItem('initConfig', JSON.stringify(this.data));
        localStorage.setItem('token', this.data.token);
      },
      error => {
        const unauthorized_code = 401;
        const internalServer_code = 500;

        let userMessage = 'Fatal error';
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case internalServer_code:
              userMessage = 'Error interno!';
              break;
            case unauthorized_code:
              userMessage = 'Credenciales inválidas';
              break;
            default:
              userMessage = 'Error de comunicación';
              break;
          }
        }
        console.log('Error', error);
      }
    );

  }
}
