import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOperationPanelOpen: boolean = false;

  didSelectItem() {
    this.isOperationPanelOpen = false;
  }
}
