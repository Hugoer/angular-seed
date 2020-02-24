import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from '../pages/login/login.component';
import { MainInterceptor } from './handlers/interceptor.service';
import { ErrorsHandler } from './handlers/errors-handler';
import { DummyComponent } from './components/dummy/dummy.component';
import { LanguageModule } from './language/language.module';
import { environment } from '@environment/environment';
import { EffectsModule } from '@ngrx/effects';

const MATERIAL_CORE_MODULES = [
    MatProgressSpinnerModule,
    MatSnackBarModule,
];

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        LanguageModule,
        MATERIAL_CORE_MODULES,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        !environment.production ?
            StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                logOnly: false, // Restrict extension to log-only mode
            }) :
            [],
        NgxWebstorageModule.forRoot({
            prefix: 'wl-',
            separator: '-',
            caseSensitive: true
        }),
    ],
    declarations: [
        SpinnerComponent,
        DummyComponent,
        LoginComponent,
    ],
    exports: [
        SpinnerComponent,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        LanguageModule,
        MATERIAL_CORE_MODULES,
        ServiceWorkerModule,
        StoreModule,
        StoreDevtoolsModule,
        NgxWebstorageModule,
    ],
    providers: [
        MatSnackBar,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MainInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: ErrorsHandler,
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
        }
    }
}
