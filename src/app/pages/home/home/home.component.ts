import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  time = new Date();

  constructor(
    private localStorage: LocalStorageService,
    private langService: TranslateService,
  ) { }

  changeLanguage() {
    const data = this.localStorage.retrieve('userLanguage');
    if (data === 'es') {
      this.langService.use('en');
    } else if (data === 'en') {
      this.langService.use('es');
    }
  }

  forceChangeLang() {
    const data = this.localStorage.retrieve('userLanguage');
    if (data === 'es') {
      moment.updateLocale('en', null);
      this.localStorage.store('userLanguage', 'en');
    } else if (data === 'en') {
      moment.updateLocale('es', null);
      this.localStorage.store('userLanguage', 'es');
    }
  }

  ngOnInit() { }
}
