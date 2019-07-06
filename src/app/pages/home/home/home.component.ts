import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  time = new Date();

  constructor(
    private localStorage: LocalStorage,
    private langService: TranslateService,
  ) { }

  changeLanguage() {
    this.localStorage.getItem('userLanguage')
      .pipe(take(1))
      .subscribe((data: string) => {
        if (data === 'es') {
          this.langService.use('en');
        } else if (data === 'en') {
          this.langService.use('es');
        }
      });
  }

  ngOnInit() {
  }

}
