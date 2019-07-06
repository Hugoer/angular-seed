import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { StorageModule } from '@ngx-pwa/local-storage';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalReduceModule } from '@app/redux/global.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from '../pages/login/login.component';
import { MainInterceptor } from './handlers/interceptor.service';
import { ErrorsHandler } from './handlers/errors-handler';
import { DummyComponent } from './components/dummy/dummy.component';
import { LanguageModule } from './language/language.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@environment/environment';

const MATERIAL_CORE_MODULES = [
    MatProgressSpinnerModule
];

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        StorageModule.forRoot({
            IDBNoWrap: true,
        }),
        LanguageModule,
        GlobalReduceModule,
        FormsModule,
        ReactiveFormsModule,
        MATERIAL_CORE_MODULES,
        ServiceWorkerModule.register('ngsw-worker.js',
            {
                enabled: environment.production
            }),
    ],
    declarations: [
        SpinnerComponent,
        DummyComponent,
        LoginComponent,
    ],
    exports: [
        SpinnerComponent,
        LoginComponent,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        StorageModule,
        LanguageModule,
        GlobalReduceModule,
        FormsModule,
        ReactiveFormsModule,
        MATERIAL_CORE_MODULES,
        ServiceWorkerModule,
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
