import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MainInterceptor } from './handlers/interceptor.service';
import { ErrorsHandler } from './handlers/errors-handler';
import { BrowserModule } from '@angular/platform-browser';
import { DummyComponent } from './components/dummy/dummy.component';
import { LanguageModule } from './language/language.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot({ prefix: `wl-`, separator: '-', caseSensitive: true }),
        LanguageModule,
    ],
    declarations: [
        DummyComponent
    ],
    exports: [
        NgxWebstorageModule,
        BrowserModule,
        LanguageModule,
        CommonModule,
        HttpClientModule,
    ],
    providers: [

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
export class CoreModule { }
