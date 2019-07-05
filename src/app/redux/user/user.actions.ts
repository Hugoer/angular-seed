import { Action } from '@ngrx/store';
import { IUser } from '@app/shared/user/user.model';

export enum UserActionTypes {
    LoadUser = '[USER] - LoadUser'
}

export class LoadUser implements Action {
    readonly type = UserActionTypes.LoadUser;
    constructor(public user: IUser) { }
}

export type UserActions = LoadUser;
