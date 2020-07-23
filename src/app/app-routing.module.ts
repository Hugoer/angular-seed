import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { LayoutModule } from './pages/layout/layout.module';
import { environment } from '../environments/environment';
import { DummyComponent } from './core/components/dummy/dummy.component';
import { ShellComponent } from './pages/layout/shell/shell.component';
// import { UserRouteAccessService } from './core/guards/user-route-access-service';
import { LoginComponent } from './pages/login/login.component';

const publicRoutes: Routes = [
  {
    path: 'no-user',
    loadChildren: () =>
      import('./pages/nouser/nouser.module').then((m) => m.NoUserModule),
  },
  {
    path: 'dummy',
    component: DummyComponent,
  },
];

const privateRoutes: Routes = [
  {
    path: '',
    // canActivate: [UserRouteAccessService],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./pages/test/test.module').then((m) => m.TestModule),
  },
];

const adminRoutes: Routes = [
  // {
  //     path: 'admin',
  //     canActivate: [AdminRouteAccessService],
  //     loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
  // },
];

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [...publicRoutes, ...privateRoutes, ...adminRoutes],
  },
  {
    path: 'login',
    component: LoginComponent,
    // loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: QuicklinkStrategy,
      useHash: true,
      enableTracing: environment.enableTracing,
    }),
  ],
  exports: [RouterModule, LayoutModule],
})
export class AppRoutingModule {}
