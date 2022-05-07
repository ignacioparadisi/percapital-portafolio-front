import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../common/classes/User";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private static loggedIn = false;

  constructor(
    private router: Router,
  ) {
    const user = localStorage.getItem('user');
    AuthGuard.loggedIn = (user !== undefined && user !== null);

    if (AuthGuard.loggedIn) {
      this.router.navigate(['/routes']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  static saveUser(user: User) {
    this.loggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
  }

  static removeUser() {
    this.loggedIn = false;
    localStorage.removeItem('user');
  }

  static getUser() {
    let userString = localStorage.getItem('user');
    if (!userString) {
      return null;
    }
    return JSON.parse(userString);
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!AuthGuard.loggedIn) {
      return this.router.navigate(['/login']);
    }

    return AuthGuard.loggedIn;
  }

  public getGuardAuthentication(): boolean {
    console.log(AuthGuard.loggedIn);
    return AuthGuard.loggedIn;
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authGuard: AuthGuard,
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authGuard.getGuardAuthentication()) {
      this.router.navigate(['/portfolio']);
    }
    return true;
  }
}
