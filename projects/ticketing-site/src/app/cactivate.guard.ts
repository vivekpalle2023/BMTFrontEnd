import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CactivateGuard implements CanActivate {

  constructor(public rtr : Router, private authenticationService: AuthenticationService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(localStorage.getItem("uname")==null || localStorage.getItem("pwd")==null){
      //   alert("Please enter credentials to login");
      //   this.rtr.navigate(["login"]);
      //   return false;
      // }else{
      // return true;
      // }

      const user = this.authenticationService.userValue;
      if (user) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.rtr.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }

  
  
}
