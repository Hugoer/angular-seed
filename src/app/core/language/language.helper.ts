import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SvsEventManager } from '../handlers/eventmanager.service';
import { LocalStorageService } from 'ngx-webstorage';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

import { ITitleNavbar } from './lang.model';

@Injectable()
export class SvLangService {
  rendererHtmlTag: Renderer2 = null;
  private actualTitle: string = null;

  constructor(
    private translateService: TranslateService,
    private rootRenderer: RendererFactory2,
    private titleService: Title,
    private router: Router,
    private eventManager: SvsEventManager,
    private localStorage: LocalStorageService,
    private adapter: DateAdapter<any>,
  ) {
    this.rendererHtmlTag = this.rootRenderer.createRenderer(
      document.querySelector('html'),
      null,
    );
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

  private changeLanguage(languageKey: string) {
    const languageStorage = this.localStorage.retrieve('userLanguage');
    if (
      (!!languageStorage && languageStorage !== languageKey) ||
      !languageStorage
    ) {
      console.log('changeLanguage: ' + languageKey);
      this.localStorage.store('userLanguage', languageKey);
      moment.locale(languageKey);
      this.adapter.setLocale(languageKey);
    }
  }

  private init() {
    this.translateService.onLangChange.subscribe(() => {
      console.log('lang changed from language helper');
      this.rendererHtmlTag.setAttribute(
        document.querySelector('html'),
        'lang',
        this.translateService.currentLang,
      );
      this.updateTabTitle();
      this.changeLanguage(this.translateService.currentLang);
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    // tslint:disable-next-line: no-string-literal
    let title: string =
      routeSnapshot.data && routeSnapshot.data['pageTitle']
        ? routeSnapshot.data['pageTitle']
        : 'global.title';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  // private addStringToTitle(title: ITitleNavbar) {
  //     const defaultTitle = this.getActualTitle();
  //     this.titleService.setTitle(`${defaultTitle} - ${title}`);
  //     this.updateNavBarTitle(`${defaultTitle} - ${title}`);
  // }

  updateNavBarTitle(title: ITitleNavbar) {
    this.eventManager.broadcast({
      name: 'titleChanged',
      content: title,
    });
  }

  getActualTitle(): string {
    return this.actualTitle;
  }

  updateTitle(title: ITitleNavbar) {
    this.titleService.setTitle(title.title);
    this.updateNavBarTitle(title);
  }

  updateOnRouting() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const titleKey = this.getPageTitle(
          this.router.routerState.snapshot.root,
        );
        this.translateService.get(titleKey).subscribe((titleTranslated) => {
          this.updateNavBarTitle({
            key: titleKey,
            title: titleTranslated,
          });
        });
        this.updateTabTitle(titleKey);
        window.scrollTo(0, 0);
      }
    });
  }

  // addKeyToTitle(titleKey: string) {
  //     const newTitle = this.translateService.instant(titleKey);
  //     this.addStringToTitle({
  //         key: titleKey,
  //         title: newTitle
  //     });
  // }

  // addTitle(title: string) {
  //     this.addStringToTitle(title);
  // }
}
