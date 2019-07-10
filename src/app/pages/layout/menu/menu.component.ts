import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@environment/environment';
import { IUser } from '@app/shared/user/user.model';
import { UserService } from '@app/shared/user/user.service';
import { ConfirmDialogComponent } from '@app/shared/components/confirm/confirm.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

    user: Promise<IUser>;
    userAdmin = false;
    isUser = false;
    envDev = false;

    constructor(
        private translateService: TranslateService,
        private userService: UserService,
        public dialog: MatDialog,
    ) {
        this.envDev = !environment.production;
    }

    ngOnInit() {
        this.user = this.userService.getIdentity();
        this.user
            .then((user) => {
                this.userAdmin = user.authorities.includes(environment.roleAccessAdminModule);
                this.isUser = user.authorities.includes(environment.roleAuthenticated);
            });
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
                    this.userService.logout()
                        .then(() => {
                            window.location.href = '.';
                        });
                }
            }
        });
    }

}
