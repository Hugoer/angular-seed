import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmDialogComponent } from './components/confirm/confirm.component';

const MATERIAL_SHARED_MODULES = [
    MatDialogModule,
    MatButtonModule,
];

@NgModule({
    imports: [
        MATERIAL_SHARED_MODULES,
        TranslateModule,
        MomentModule,
        RouterModule,
        QuicklinkModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
    exports: [
        ConfirmDialogComponent,
        MATERIAL_SHARED_MODULES,
        TranslateModule,
        MomentModule,
        RouterModule,
        QuicklinkModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ]
})
export class SharedModule { }
