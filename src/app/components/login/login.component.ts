import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any;
  endpoint = environment.APIEndpoint + 'Login/Login';
  
  constructor(private loginService: LoginService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  
  signIn(credentials) {
    this.login(credentials.email, credentials.password);
  }

  login(email, password) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    
    console.log('Login Service');
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
        localStorage.setItem('rol', jwtJson['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

        this.router.navigateByUrl('/posts');
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
