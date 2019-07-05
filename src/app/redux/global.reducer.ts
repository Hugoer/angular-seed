import { ActionReducerMap } from '@ngrx/store';
import { UserState, userReducer } from './user/user.reducer';

export interface MainState {
    user: UserState;
}
export interface RootState {
    main: MainState;
}

export const compReducers: ActionReducerMap<MainState> = {
    user: userReducer,
};

