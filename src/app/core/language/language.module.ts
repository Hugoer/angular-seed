import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  MissingTranslationHandler,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from 'ngx-webstorage';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import { AppMissingTranslationHandler } from './missing-translation';
import { SvLangService } from './language.helper';
import { environment } from '@environment/environment';

export function translatePartialLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export function missingTranslationHandler() {
  return new AppMissingTranslationHandler();
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
      isolate: true,
    }),
  ],
  declarations: [],
  exports: [TranslateModule],
  providers: [
    AppMissingTranslationHandler,
    SvLangService,
    { provide: MAT_DATE_LOCALE, useValue: environment.defaultI18nLang },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class LanguageModule {
  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    @Optional() @SkipSelf() parentModule: LanguageModule,
    private adapter: DateAdapter<any>,
  ) {
    if (parentModule) {
      throw new Error(
        'LanguageModule has already been loaded. You should only import Core modules in the CoreModule only.',
      );
    }
    const data = this.localStorage.retrieve('userLanguage');
    const languageStorage = data || environment.defaultI18nLang;
    if (!!languageStorage) {
      this.translate.use(languageStorage);
      this.adapter.setLocale(languageStorage);
    }
  }
}
