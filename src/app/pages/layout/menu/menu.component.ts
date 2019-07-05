import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

    main = {
        index: '',
        list: '',
        signOut: '',
        signOutQuestion: '',
    };

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
        this.translateService.get([
            'main.index',
            'main.list',
            'main.signOut',
            'main.signOutQuestion',
        ]).toPromise().then((translation) => {
            this.main.index = translation['main.index'];
            this.main.list = translation['main.list'];
            this.main.signOut = translation['main.signOut'];
            this.main.signOutQuestion = translation['main.signOutQuestion'];
        });
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
                title: this.main.signOut,
                question: this.main.signOutQuestion,
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
