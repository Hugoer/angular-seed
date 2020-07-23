import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from './ComponentCanDeactivate';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private translateService: TranslateService) {}

  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.canDeactivate()) {
      const lostDataMessage = this.translateService.instant('global.lostdata');
      if (confirm(lostDataMessage)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
