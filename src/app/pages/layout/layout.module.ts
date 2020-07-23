import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@app/shared/shared.module';
import { CloseMenuDirective } from '@app/core/directives/closemenu.directive';
import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';

const MATERIAL_LAYOUT_MODULES = [
  MatTooltipModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatButtonModule,
  MatDialogModule,
  MatAutocompleteModule,
];

@NgModule({
  imports: [SharedModule, MATERIAL_LAYOUT_MODULES],
  exports: [
    ShellComponent,
    NavbarComponent,
    MenuComponent,
  ],
  declarations: [
    ShellComponent,
    NavbarComponent,
    MenuComponent,
    CloseMenuDirective,
  ],
  entryComponents: [],
  providers: [],
})
export class LayoutModule { }
