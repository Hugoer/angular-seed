import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { IUser } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user: IUser;

    constructor(
        private http: HttpClient,
        private translateService: TranslateService,
        private localStorage: LocalStorageService,
        private router: Router,
    ) {
    }

    logout(): Observable<any> {
        return new Observable((observer) => {
            this.localStorage.clear('userLanguage');
            observer.next();
            observer.complete();
        });
    }

    getIdentity(force?: boolean): Observable<IUser> {
        return new Observable<IUser>((observer) => {
            if (force === true || !this.user) {
                this.http.get(environment.apiUrl + 'account')
                    .toPromise()
                    .then((response: IUser) => {
                        const apiLang = response.langKey.toString().toLocaleLowerCase();
                        this.user = {
                            ...response,
                            langKey: !!response.langKey ? apiLang : environment.defaultI18nLang
                        };
                        // Si al cargar el usuario no tiene langKey, y en localStorage tampoco, se pone la de por defecto
                        const actualLang = this.translateService.currentLang;
                        if (!actualLang) {
                            // if (!!this.user.langKey) {
                            // this.languageService.changeLanguage(this.user.langKey);
                            this.translateService.use(this.user.langKey);
                            // }
                        } else {
                            if (actualLang !== this.user.langKey) {
                                // this.languageService.changeLanguage(this.user.langKey);
                                this.translateService.use(this.user.langKey);
                            }
                        }

                        if (this.user.authorities.length === 0 || !this.user.authorities.includes(environment.roleAuthenticated)) {
                            this.router.navigate(['no-user']);
                        } else {
                            // this.store.dispatch(new LoadUser(this.user));
                        }

                        observer.next(response);
                        observer.complete();
                    })
                    .catch((err) => {
                        if (err.status === 403) {
                            if (!this.translateService.currentLang) {
                                // this.languageService.changeLanguage(environment.defaultI18nLang);
                                this.translateService.use(environment.defaultI18nLang);
                            }
                            this.router.navigate(['no-user']);
                        }
                        observer.error(err);
                        observer.complete();
                    });
            } else if (!!this.user) {
                // resolve(this.user);
                observer.next(this.user);
                observer.complete();
            }
        });

    }

    getLanguage(): string {
        if (!!this.user) {
            return this.user.langKey;
        } else {
            return null;
        }
    }

    // isAuthenticated(): Promise<boolean> {
    //     return new Promise<boolean>((resolve) => {
    //         this.getIdentity()
    //             .then((result) => {
    //                 resolve(!!result);
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //                 resolve(false);
    //             });
    //     });
    // }

    getToken(): string {
        return !!this.user ? this.user.accessToken : null;
    }

    setToken(token: string): void {
        this.user = {
            ...this.user,
            accessToken: token
        };
    }

    getServerProfileInfo() {
        return this.http.get(environment.apiUrl + 'account')
            .toPromise();
    }

}
