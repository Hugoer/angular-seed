import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seed';
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      swUpdate.checkForUpdate();
      this.swUpdate.available.subscribe(() => {
        if (confirm(`Do you want to update ${this.title}?`)) {
          window.location.reload();
        }
      });
    }
  }
}
