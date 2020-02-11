import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SvsEventManager } from '@app/core/handlers/eventmanager.service';
import { timer } from 'rxjs';
import { environment } from '@environment/environment';
import { UserService } from '@app/shared/user/user.service';


@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})

export class ShellComponent implements OnInit {

    @ViewChild('fnMenu') menu: MatSidenav;
    showProgressBar = false;
    counter: number;



    constructor(
        private eventManager: SvsEventManager,
        private userService: UserService,
    ) {
        this.counter = 0;
        eventManager.subscribe('xhrStart', () => {
            this.counter++;
            if (this.counter > 0) {
                setTimeout(() => {
                    this.showProgressBar = true;
                });
            }
        });
        eventManager.subscribe('xhrStop', () => {
            this.counter--;
            if (this.counter === 0) {
                this.showProgressBar = false;
            }
        });

        // No hace falta hacer un unsubscribe ya que este componente
        // está vivo mientras la aplicación esté abierta
        // y aún cambiando de módulos (lazy routing) solo se crea una vez
        if (environment.mustRefreshToken) {
            timer(0, environment.forceRefreshToken)
                .subscribe(() => {
                    this.userService.getServerProfileInfo();
                });
        }

    }

    open() {
        this.menu.open();
    }

    close() {
        this.menu.close();
    }

    ngOnInit() {
        this.eventManager.subscribe('openSideNav', () => {
            this.open();
        });
        this.eventManager.subscribe('closeSideNav', () => {
            this.close();
        });

    }

}
