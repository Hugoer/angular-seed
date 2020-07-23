import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'seed';
  constructor(
    private swUpdate: SwUpdate,
    private localStorage: LocalStorageService,

  ) {

  }

  ngOnInit() {
    this.checkSW();
    this.checkLanguage();
  }

  private checkSW() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.available.subscribe(() => {
        if (confirm(`Do you want to update ${this.title}?`)) {
          window.location.reload();
        }
      });
    }
  }

  private checkLanguage() {
    const language = this.localStorage.retrieve('userLanguage');
    if (!language) {
      this.localStorage.store('userLanguage', environment.defaultI18nLang);
    }
  }

}
