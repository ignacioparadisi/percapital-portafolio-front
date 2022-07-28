import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { User } from 'src/common/classes/User';
import { AuthGuard, LoginGuard } from 'src/resources/auth-guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOperationPanelOpen: boolean = false;

  constructor(private router: Router, private authGuard: AuthGuard, private loginGuard: LoginGuard) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOperationPanelOpen = ['/buy-operations', '/sell-operations'].includes(event.url)
      }
    });
    console.log('User', authGuard.getUser());
  }

  didSelectItem() {
    this.isOperationPanelOpen = false;
  }

  logout() {
    this.loginGuard.logout();
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return this.authGuard.getUser()?.roles?.map((role) => role.id)?.includes(User.ROLE_ADMIN);
  }

  isLoggedIn() {
    return this.loginGuard.isLoggedIn;
  }
}
