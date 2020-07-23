import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { UserService } from '@app/shared/user/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  public doGetProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadUser),
      concatMap(() =>
        this.userService.getIdentity().pipe(
          map((user) => {
            return UserActions.LoadUserSuccess({ user });
          }),
          catchError((err) => {
            return of(UserActions.LoadUserFailure(err));
          }),
        ),
      ),
    ),
  );

  public doLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Logout),
      concatMap(() =>
        this.userService.logout().pipe(
          map(() => {
            window.location.href = '.';
            return UserActions.LogoutSuccess();
          }),
          catchError((err) => {
            return of(UserActions.LogoutFailure(err));
          }),
        ),
      ),
    ),
  );
}
