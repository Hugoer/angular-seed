import { createAction, props } from '@ngrx/store';
import { IUser } from '@app/shared/user/user.model';

export enum UserActionTypes {
    LoadUser = '[USER] - LoadUser',
    LoadUserSuccess = '[USER] - LoadUserSuccess',
    LoadUserFailure = '[USER] - LoadUserFailure',

    Logout = '[USER] - Logout',
    LogoutSuccess = '[USER] - LogoutSuccess',
    LogoutFailure = '[USER] - LogoutFailure',
}

export const LoadUser = createAction(
    UserActionTypes.LoadUser,
);

export const LoadUserSuccess = createAction(
    UserActionTypes.LoadUserSuccess,
    props<{ user: IUser }>()
);

export const LoadUserFailure = createAction(
    UserActionTypes.LoadUserFailure,
    props<{ error: any }>()
);

export const Logout = createAction(
    UserActionTypes.Logout,
);

export const LogoutSuccess = createAction(
    UserActionTypes.LogoutSuccess,
);

export const LogoutFailure = createAction(
    UserActionTypes.LogoutFailure,
    props<{ error: any }>()
);
