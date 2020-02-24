import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@app/shared/user/user.model';
import * as UserActionTypes from './user.actions';

export interface UserState {
    user: IUser;
    userLoading: boolean;
    userLoaded: boolean;
    userFailure: boolean;

    logoutLoading: boolean;
    logoutLoadingSuccess: boolean;
    logoutLoadingFailure: boolean;
}

const initialStatus: UserState = {
    user: null,
    userLoading: false,
    userLoaded: false,
    userFailure: false,

    logoutLoading: false,
    logoutLoadingSuccess: false,
    logoutLoadingFailure: false,
};

const reducer = createReducer(
    initialStatus,
    on(
        UserActionTypes.LoadUser,
        (state) => {
            return {
                ...state,
                userLoading: true,
                userLoaded: false,
                userFailure: false,
            };
        }
    ),
    on(
        UserActionTypes.LoadUserSuccess,
        (state, { user }) => {
            return {
                ...state,
                user,
                userLoading: false,
                userLoaded: true,
                userFailure: false,
            };
        }
    ),
    on(
        UserActionTypes.LoadUserFailure,
        (state) => {
            return {
                ...state,
                userLoading: false,
                userLoaded: false,
                userFailure: true,
            };
        }
    ),
    on(
        UserActionTypes.Logout,
        (state) => {
            return {
                ...state,
                logoutLoading: true,
                logoutLoadingSuccess: false,
                logoutLoadingFailure: false,
            };
        }
    ),
    on(
        UserActionTypes.LogoutSuccess,
        (state) => {
            return {
                ...state,
                user: null,
                userLoading: false,
                userLoaded: false,
                userFailure: false,
                logoutLoading: false,
                logoutLoadingSuccess: true,
                logoutLoadingFailure: false,
            };
        }
    ),
    on(
        UserActionTypes.LogoutFailure,
        (state) => {
            return {
                ...state,
                logoutLoading: false,
                logoutLoadingSuccess: false,
                logoutLoadingFailure: true,
            };
        }
    ),
);

export function userReducer(worklogState: UserState | undefined, action: Action) {
    return reducer(worklogState, action);
}
