import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  CanLoad,
  Route,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { UserService } from '@app/shared/user/user.service';
import { IUser } from '@app/shared/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserRouteAccessService implements CanLoad, CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  private can(): Promise<boolean> {
    // console.log('user-route-access-service.ts');
    return new Promise((resolve, reject) => {
      this.userService
        .getIdentity()
        .then((user: IUser) => {
          const isUser = user.authorities.includes(
            environment.roleAuthenticated,
          );
          this.router.navigate(['login']);
          resolve(isUser);
        })
        .catch((err) => {
          console.error(err);
          this.router.navigate(['login']);
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
