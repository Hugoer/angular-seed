import { tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpErrorResponse,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {
    MatSnackBar,
    MatSnackBarVerticalPosition,
    MatSnackBarHorizontalPosition
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '@environment/environment';
import { SvsEventManager } from '@app/core/handlers/eventmanager.service';
import { Router } from '@angular/router';

const enum ToastType {
    'primary',
    'warn',
    'accent'
}

interface IServerMessage {
    alert: string;
    param: number;
}

@Injectable()
export class MainInterceptor implements HttpInterceptor {

    arrStatusCodeTrad = {};

    getWindow(): any {
        return window;
    }

    constructor(
        private snackBar: MatSnackBar,
        private translateService: TranslateService,
        private svsEventManager: SvsEventManager,
        private router: Router,
    ) {
        const myEventManager = this.svsEventManager;
        const showXhr = (xhr) => {
            if (xhr.__zone_symbol__xhrURL.indexOf('http') >= 0) {
                const myUrl = new URL(xhr.__zone_symbol__xhrURL);
                const urlSearch = myUrl.protocol + '//' +
                    myUrl.hostname + ':' +
                    myUrl.port +
                    myUrl.pathname;
                myEventManager.broadcast({
                    name: 'xhrStart'
                });
                const token = sessionStorage.getItem(urlSearch);
                if (!!token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                }
            }
        };

        const hideXhr = (xhr) => {
            if (xhr.__zone_symbol__xhrURL.indexOf('http') >= 0) {
                // const myUrl = new URL(xhr.__zone_symbol__xhrURL);
                // const urlSearch = myUrl.protocol + '//' +
                //     myUrl.hostname + ':' +
                //     myUrl.port +
                //     myUrl.pathname;
                // const token = sessionStorage.getItem(urlSearch);
                // if (!!token) {
                myEventManager.broadcast({
                    name: 'xhrStop'
                });
                // }
            }
        };

        const proxy = {
            // tslint:disable
            open: function (_arg, xhr) {
                xhr.addEventListener('load', () => {
                    hideXhr(xhr);
                });
                xhr.addEventListener('error', () => {
                    hideXhr(xhr);
                });
                xhr.addEventListener('abort', () => {
                    hideXhr(xhr);
                });
            },
            send: function (_arg, xhr) {
                showXhr(xhr);
            }
            // tslint:enable
        };

        this.getWindow()._ahrealxhr = this.getWindow()._ahrealxhr || XMLHttpRequest;
        // tslint:disable
        this.getWindow().XMLHttpRequest = function () {
            // tslint:disable
            const _window: any = window;
            this.xhr = new _window._ahrealxhr;
            for (const attr in this.xhr) {
                let type = '';
                try {
                    type = typeof this.xhr[attr];
                } catch (e) { }
                if (type === 'function') {
                    this[attr] = hookfun(attr);
                } else {
                    Object.defineProperty(this, attr, {
                        get: getFactory(attr),
                        set: setFactory(attr)
                    });
                }
            }
            // tslint:enable
        };
        // tslint:enable
        function getFactory(attr) {
            // tslint:disable
            return function () {
                const v = this.hasOwnProperty(attr + '_') ? this[attr + '_'] : this.xhr[attr];
                const attrGetterHook = (proxy[attr] || {})['getter'];
                return attrGetterHook && attrGetterHook(v, this) || v;
            };
            // tslint:enable
        }

        function setFactory(attr) {
            // tslint:disable
            return function (v) {
                const xhr = this.xhr;
                const that = this;
                const hook = proxy[attr];
                if (typeof hook === 'function') {
                    xhr[attr] = function () {
                        // tslint:disable-next-line:no-unused-expression
                        proxy[attr](that) || v.apply(xhr, arguments);
                    };
                } else {
                    // If the attribute isn't writeable, generate proxy attribute
                    const attrSetterHook = (hook || {})['setter'];
                    v = attrSetterHook && attrSetterHook(v, that) || v;
                    try {
                        xhr[attr] = v;
                    } catch (e) {
                        this[attr + '_'] = v;
                    }
                }
            };
            // tslint:enable
        }

        function hookfun(fun) {
            // tslint:disable
            return function () {
                const args = [].slice.call(arguments);
                if (proxy[fun] && proxy[fun].call(this, args, this.xhr)) {
                    return;
                }
                return this.xhr[fun].apply(this.xhr, args);
            };
            // tslint:enable
        }

    }

    private showNotification(message: string, type: ToastType, detail?: string) {
        let cssClass = '';
        switch (type) {
            case ToastType.accent:
                cssClass = '';
                break;
            case ToastType.primary:
                cssClass = 'style-success';
                break;
            case ToastType.warn:
                cssClass = 'style-error';
                break;
            default:
                break;
        }
        let fullMessage;
        if (!!detail) {
            fullMessage = `${message} - ${detail}`;
        } else {
            fullMessage = `${message}`;
        }

        this.snackBar.open(fullMessage, null, {
            duration: environment.toast.duration,
            verticalPosition: environment.toast.verticalPosition as MatSnackBarVerticalPosition,
            horizontalPosition: environment.toast.horizontalPosition as MatSnackBarHorizontalPosition,
            panelClass: cssClass
        });
    }

    private processStatus(statusCode: number, err?: any, serverAlert?: IServerMessage) {
        switch (true) {
            case (statusCode === -1):
                const errText = !!err.error ? err.error.text : '';
                this.showNotification(this.translateService.instant('global.http.json'), ToastType.primary, errText);
                break;
            case (statusCode === 200):
                if (!!serverAlert.alert && !environment.httpAvoidMessages.includes(serverAlert.alert)) {
                    this.showNotification(
                        this.translateService.instant(serverAlert.alert, { param: serverAlert.param }),
                        ToastType.primary
                    );
                }
                break;
            case (statusCode === 201):
                if (!!serverAlert.alert && !environment.httpAvoidMessages.includes(serverAlert.alert)) {
                    this.showNotification(
                        this.translateService.instant(serverAlert.alert, { param: serverAlert.param }),
                        ToastType.primary
                    );
                } else {
                    this.showNotification(this.translateService.instant('global.http.201'), ToastType.primary);
                }
                break;
            case (statusCode === 204):
                this.showNotification(this.translateService.instant('global.http.204'), ToastType.primary);
                break;
            case (statusCode === 400):
                this.showNotification(this.translateService.instant('global.http.400'), ToastType.warn);
                break;
            case (statusCode === 403):
                this.showNotification(this.translateService.instant('global.http.403'), ToastType.warn);
                break;
            case (statusCode === 401):
                this.showNotification(this.translateService.instant('global.http.401'), ToastType.warn);
                this.router.navigate(['login']);
                break;
            case (statusCode === 404):
                this.showNotification(this.translateService.instant('global.http.404'), ToastType.warn);
                break;
            case (statusCode === 409):
                this.showNotification(this.translateService.instant('global.http.409'), ToastType.warn, err.error.detail);
                break;
            case (statusCode < 600 && statusCode >= 500):
                const errDetail =
                    !!err.error &&
                    (
                        err.error.detail ||
                        err.error.title ||
                        `${err.error.error} ${!!err.error.message ? '(' + err.error.message + ')' : ''}`
                    );
                this.showNotification(
                    this.translateService.instant('global.http.500'),
                    ToastType.warn,
                    errDetail
                );
                break;
            default:
                this.showNotification(this.translateService.instant('global.http.defaulterror'), ToastType.warn);
                break;
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        let dummyrequest: HttpRequest<any>;
        dummyrequest = req.clone({});

        this.svsEventManager.broadcast({
            name: 'httpStart'
        });

        const httpEvent = next.handle(dummyrequest);

        return httpEvent
            .pipe(
                tap((event) => {
                    if (event instanceof HttpResponse) {

                        const serverAlert: IServerMessage = {
                            alert: event.headers.get('x-app-alert'),
                            param: +event.headers.get('x-app-params')
                        };

                        this.processStatus(event.status, null, serverAlert);
                    }
                }, (err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 200) {
                            this.processStatus(err.status, err);
                        } else {
                            // Incluimos esto aquí porque puede ser que el API no devuelva un json y al procesar la respuesta falle
                            // aún siendo un 200. Si ha entrado aquí (err) es que algo ha ocurrido y debemos notificarlo.
                            this.processStatus(-1, err);
                        }
                    }
                }),
                finalize(() => {
                    this.svsEventManager.broadcast({
                        name: 'httpStop'
                    });
                })
            );

    }

}
