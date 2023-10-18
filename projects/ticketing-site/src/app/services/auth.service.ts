import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

  // public username: string = "";
  // public password: string = "";

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {

    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();

  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }




  //// New Implementation with JWT

  loginService(username: string, password: string) {
    console.log("inside login service auth "+username);
    return this.http.post<any>(`${environment.apiUrl}/bmt/login`, { username, password })
      .pipe(map((user: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
        );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/main']);
  }

  public get userValue() {
    return this.userSubject.value;
  }

}