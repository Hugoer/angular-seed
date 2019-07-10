import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

import { environment } from '@environment/environment';
import { IUser } from './user.model';
import { LoadUser } from '@app/redux/user/user.actions';
import { RootState } from '@app/redux/global.reducer';

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
        private store: Store<RootState>,
    ) {
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(environment.apiUrl + 'logout', {})
                .toPromise()
                .then(() => {
                    this.localStorage.clear('userLanguage');
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    getIdentity(force?: boolean): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
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
                            this.store.dispatch(new LoadUser(this.user));
                        }

                        resolve(response);
                    })
                    .catch((err) => {
                        if (err.status === 403) {
                            if (!this.translateService.currentLang) {
                                // this.languageService.changeLanguage(environment.defaultI18nLang);
                                this.translateService.use(environment.defaultI18nLang);
                            }
                            this.router.navigate(['no-user']);
                        }
                        reject(err);
                    });
            } else if (!!this.user) {
                resolve(this.user);
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

    isAuthenticated(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.getIdentity()
                .then((result) => {
                    resolve(!!result);
                })
                .catch((err) => {
                    console.error(err);
                    resolve(false);
                });
        });
    }

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
