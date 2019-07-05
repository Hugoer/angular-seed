import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SvsEventManager } from '../handlers/eventmanager.service';

@Injectable()
export class SvTitleService {
    rendererHtmlTag: Renderer2 = null;
    private actualTitle: string = null;

    constructor(
        private translateService: TranslateService,
        private rootRenderer: RendererFactory2,
        private titleService: Title,
        private router: Router,
        private eventManager: SvsEventManager,
    ) {
        this.rendererHtmlTag = this.rootRenderer.createRenderer(document.querySelector('html'), null);
        this.init();
    }

    private updateTabTitle(titleKey?: string) {

        if (!titleKey) {
            titleKey = this.getPageTitle(this.router.routerState.snapshot.root);
        }

        this.translateService.get(titleKey).subscribe((title) => {
            this.titleService.setTitle(title);
            this.actualTitle = title;
        });
    }

    private init() {
        this.translateService.onLangChange
            .subscribe(() => {
                this.rendererHtmlTag.setAttribute(document.querySelector('html'), 'lang', this.translateService.currentLang);
                this.updateTabTitle();
            });

    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
        // tslint:disable-next-line: no-string-literal
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'global.title';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    updateNavBarTitle(title: string) {
        this.eventManager.broadcast({
            name: 'titleChanged',
            content: title
        });
    }

    getActualTitle(): string {
        return this.actualTitle;
    }

    updateTitle(title: string) {
        // Se hace esto porque es imposible controlar la sincronía cuando entramos
        // directamente a una url, que tiene que cargar su texto, y la propia página
        // cambia estos títulos (que es esta función la única que realiza esa acción)
        // setTimeout(() => {
        this.titleService.setTitle(title);
        this.updateNavBarTitle(title);
        // }, 200);
    }

    updateOnRouting() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const titleKey = this.getPageTitle(this.router.routerState.snapshot.root);
                this.translateService.get(titleKey).subscribe((title) => {
                    this.updateNavBarTitle(title);
                });
                this.updateTabTitle(titleKey);
                window.scrollTo(0, 0);
            }
        });
    }

    private addStringToTitle(title: string) {
        const defaultTitle = this.getActualTitle();
        // const newTitle = this.translateService.instant(titleKey);
        this.titleService.setTitle(`${defaultTitle} - ${title}`);
        this.updateNavBarTitle(`${defaultTitle} - ${title}`);
    }

    addKeyToTitle(titleKey: string) {
        // setTimeout(() => {
        // const defaultTitle = this.getActualTitle();
        // const newTitle = this.translateService.instant(titleKey);
        // this.titleService.setTitle(`${defaultTitle} - ${newTitle}`);
        // this.updateNavBarTitle(`${defaultTitle} - ${newTitle}`);
        // }, 200);
        const newTitle = this.translateService.instant(titleKey);
        this.addStringToTitle(newTitle);
    }

    addTitle(title: string) {
        this.addStringToTitle(title);
    }

}
