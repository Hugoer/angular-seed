import { PreloadingStrategy, Route } from '@angular/router';
import { timer, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  // tslint:disable-next-line: ban-types
  preload(route: Route, load: Function): Observable<any> {
    const loadRoute = (delay) =>
      delay ? timer(150).pipe(flatMap((_) => load())) : load();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}
