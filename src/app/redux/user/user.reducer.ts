import { IUser } from '@app/shared/user/user.model';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
    user: IUser;
}

const initialStatus: UserState = {
    user: null
};

export function userReducer(state = initialStatus, action: UserActions): UserState {

    switch (action.type) {
        case UserActionTypes.LoadUser:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}
