import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Route,
  CanLoad,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

import { UserService } from '@app/shared/user/user.service';
import { IUser } from '@app/shared/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminRouteAccessService implements CanActivate, CanLoad {
  constructor(private userService: UserService) {}

  private can(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService
        .getIdentity()
        .then((user: IUser) => {
          const isAdmin = user.authorities.includes(
            environment.roleAccessAdminModule,
          );
          resolve(isAdmin);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  // tslint:disable-next-line: variable-name
  canLoad(_route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.can();
  }
  // tslint:disable-next-line: variable-name
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    return this.can();
  }
}
