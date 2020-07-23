import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { SvsEventManager } from '@app/core/handlers/eventmanager.service';

import { SvLangService } from '@app/core/language/language.helper';
import { ITitleNavbar } from '@app/core/language/lang.model';
// import { EnumMapActions } from '@app/pages/main/main/main.model';

export interface IAction {
  name: string;
  icon: string;
  // action: EnumMapActions;
  enabled: boolean;
  visible: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  actions: IAction[] = [];

  showMenu = false;

  isLoading = false;

  title: ITitleNavbar;

  constructor(
    private cd: ChangeDetectorRef,
    private eventManager: SvsEventManager,
    private router: Router,
    private titleService: SvLangService,
  ) {
    this.eventManager.subscribe('titleChanged', (param) => {
      this.title = param.content as ITitleNavbar;
      this.cd.markForCheck();
    });

    this.titleService.updateOnRouting();

    // const url: string = this.router.routerState.snapshot.url;
    this.processActionsRouting();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.processActionsRouting();
      }
    });
  }

  private getRouteObject(routeSnapshot: ActivatedRouteSnapshot): any {
    let data = !!(
      routeSnapshot.data.pageTitle || routeSnapshot.data.showNavbarMenu
    )
      ? routeSnapshot
      : null;
    if (routeSnapshot.firstChild) {
      data = this.getRouteObject(routeSnapshot.firstChild) || data;
    }
    return data;
  }

  private processActionsRouting(): void {
    const route = this.getRouteObject(this.router.routerState.snapshot.root);
    if (!!route && !!route.data) {
      this.showMenu = !!route.data.showNavbarMenu;

      this.cd.markForCheck();
      // switch (true) {
      //     // Cargamos el mapa nuevo
      //     case (!route.url[0] && url === '/'):
      //         this.actions.find((action) => {
      //             return (action.action === EnumMapActions.NEW);
      //         }).enabled = false;
      //         break;
      //     default:
      //         break;
      // }
    }
  }

  // tslint:disable-next-line: variable-name
  trackById(_index, item) {
    return item.action;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  openMenu() {
    this.eventManager.broadcast({
      name: 'openSideNav',
    });
  }

  // dispatchMenuAction(action: EnumMapActions) {
  //     this.eventManager.broadcast({
  //         name: 'mapAction',
  //         content: {
  //             action: action
  //         }
  //     });
  // }
}
