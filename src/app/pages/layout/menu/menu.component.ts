import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environment/environment';
import { IUser } from '@app/shared/user/user.model';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ConfirmDialogComponent } from '@app/shared/components/confirm/confirm.component';
import { UserSandbox } from '@app/redux/user/user.sandbox';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {

    private unsubscribe$ = new Subject<void>();

    user: Promise<IUser>;
    userAdmin = false;
    isUser = false;
    envDev = false;

    constructor(
        private translateService: TranslateService,
        public dialog: MatDialog,
        private userSandbox: UserSandbox,
    ) {
        this.envDev = !environment.production;
    }

    ngOnInit() {
        this.userSandbox.getUser$
            .pipe(
                takeUntil(this.unsubscribe$),
                filter((user) => !!user),
            )
            .subscribe((user) => {
                this.userAdmin = user.authorities.includes(environment.roleAccessAdminModule);
                this.isUser = user.authorities.includes(environment.roleAuthenticated);
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    signOut(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: this.translateService.instant('main.signOut'),
                question: this.translateService.instant('main.signOutQuestion'),
                positive: 'main.signOut'
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            // Si se cierra el diálogo desde el botón Escape, no se
            if (!!result) {
                // TODO: esto es horrible... revisar!
                const resultClosed = JSON.parse(result);
                if (resultClosed === true) {
                    this.userSandbox.doLogout();
                    // this.userService.logout()
                    //     .then(() => {
                    //         window.location.href = '.';
                    //     });
                }
            }
        });
    }

}
