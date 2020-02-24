import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '@app/shared/shared.module';
import { UserEffects } from '@app/redux/user/user.effect';
import { userReducer } from '@app/redux/user/user.reducer';
// import { UserSandbox } from '@app/redux/user/user.sandbox';

const MATERIAL_PAGES_MODULES = [
  MatButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    MATERIAL_PAGES_MODULES,
    HomeRoutingModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([
      UserEffects,
    ]),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    MATERIAL_PAGES_MODULES,
  ],
  providers: [
    // UserSandbox,
  ]
})
export class HomeModule { }
