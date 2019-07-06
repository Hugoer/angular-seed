import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './components/confirm/confirm.component';

const MATERIAL_COMPONENTS_MODULES = [
    MatDialogModule,
    MatButtonModule,
];

@NgModule({
    imports: [
        MATERIAL_COMPONENTS_MODULES,
        TranslateModule,
        MomentModule,
        RouterModule,
        CommonModule,
    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
    exports: [
        ConfirmDialogComponent,
        MATERIAL_COMPONENTS_MODULES,
        TranslateModule,
        MomentModule,
        RouterModule,
        CommonModule,
    ]
})
export class SharedModule { }
