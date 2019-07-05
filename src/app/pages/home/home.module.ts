import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@app/shared/shared.module';


const MATERIAL_PAGES_MODULES = [
  MatButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    MATERIAL_PAGES_MODULES,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    MATERIAL_PAGES_MODULES,
  ]
})
export class HomeModule { }
