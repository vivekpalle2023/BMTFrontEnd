import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, first, of } from 'rxjs';
import { BmtServices } from '../services/bmt.service';
import { AuthenticationService } from '../services/auth.service';
import { LoginForm } from '../model/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  username: string = "";
  password: string = "";
  successMessage: string = "";
  invalidLogin = false;
  loginSuccess = false;
  error: string = "";

  responseData?: any;

  public loginForm !: FormGroup;

  loading = false;

  constructor(private service: BmtServices, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }


  handleLogin() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.authenticationService.loginService(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
        },
        error: (error: string) => {
          if(error === "unauthorized"){
            this.error = "Unauthorized User";
          } else {
            this.error = "Invalid Credentials";
          }
          this.loading = false;
          this.isLoginFailed = true;
        }
      });
  }
}
