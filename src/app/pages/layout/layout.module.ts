import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CloseMenuDirective } from '@app/core/directives/closemenu.directive';
import { LanguageModule } from '@app/core/language/language.module';

import { ShellComponent } from './shell/shell.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { SpinnerComponent } from '@app/core/components/spinner/spinner.component';

const MATERIAL_LAYOUT_MODULES = [
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
];

@NgModule({
    imports: [
        SharedModule,
        MATERIAL_LAYOUT_MODULES
    ],
    exports: [
        // SpinnerComponent,
        SharedModule,
        ShellComponent,
        NavbarComponent,
        MenuComponent,
        CloseMenuDirective,
        LanguageModule,
        MATERIAL_LAYOUT_MODULES,

    ],
    declarations: [
        SpinnerComponent,
        ShellComponent,
        NavbarComponent,
        MenuComponent,
        CloseMenuDirective,
    ],
    entryComponents: [

    ],
    providers: [
        MatSnackBarModule,
        SharedModule,
    ]
})

export class LayoutModule { }
