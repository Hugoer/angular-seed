import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './user.reducer';
import { getUser } from './user.selectors';
import { LoadUser, Logout } from './user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserSandbox {
    public getUser$ = this.appState.select(getUser);

    constructor(
        protected appState: Store<UserState>,
    ) {

    }

    public getUser() {
        this.appState.dispatch(LoadUser());
    }

    public doLogout() {
        this.appState.dispatch(Logout());
    }

}
