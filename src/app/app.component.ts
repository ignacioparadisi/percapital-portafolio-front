import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOperationPanelOpen: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOperationPanelOpen = ['/buy-operations', '/sell-operations'].includes(event.url)
      }
    });
  }

  didSelectItem() {
    this.isOperationPanelOpen = false;
  }
}
