import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "../common/classes/User";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor() {

  }

  getUser(): User | null {
    let userString = localStorage.getItem('user');
    if (!userString) {
      return null;
    }
    return JSON.parse(userString);
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let role = next.data.role;
    let user = this.getUser();
    console.log('Checking role...');
    console.log(role);
    console.log(user?.roles)
    if (role && user?.roles?.map((role) => role.id).includes(role)) {
      return true;
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authGuard: AuthGuard
  ) {
    const user = this.authGuard.getUser();
    this.isLoggedIn = (user !== undefined && user !== null);

    if (this.isLoggedIn) {
      console.log('Hola')
      this.router.navigate(['/portfolio']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  login(user: User) {
    this.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    console.log(`IS SIGNED IN ${this.isLoggedIn}`)
    return this.isLoggedIn;
  }

}
