import { NgModule, SkipSelf, Optional } from '@angular/core';

// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {
    TranslateModule,
    TranslateLoader,
    MissingTranslationHandler,
    TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as moment from 'moment';

import { AppMissingTranslationHandler } from './missing-translation';
import { SvLangService } from './language.helper';
import { environment } from '@environment/environment';
import { take } from 'rxjs/operators';

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
                deps: [HttpClient]
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useFactory: missingTranslationHandler,
            },
            isolate: true
        }),
    ],
    declarations: [
    ],
    exports: [
        TranslateModule,
    ],
    providers: [
        AppMissingTranslationHandler,
        SvLangService,
    ]
})
export class LanguageModule {
    constructor(
        private translate: TranslateService,
        private localStorage: LocalStorage,
        @Optional() @SkipSelf() parentModule: LanguageModule
    ) {
        if (parentModule) {
            throw new Error('LanguageModule has already been loaded. You should only import Core modules in the CoreModule only.');
        }
        this.localStorage.getItem('userLanguage')
            .pipe(take(1))
            .subscribe((data: string) => {
                const languageStorage = data;
                if (!!languageStorage) {
                    this.translate.use(languageStorage);
                } else {
                    this.translate.use(environment.defaultI18nLang);
                    this.localStorage.setItem('userLanguage', environment.defaultI18nLang).subscribe(() => { });
                }
                moment.locale(this.translate.currentLang);
            });

    }
}
