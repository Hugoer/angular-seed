import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// import { QuicklinkModule } from 'ngx-quicklink';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm/confirm.component';

import { GlobalReduceModule } from '@app/redux/global.module';

const MATERIAL_COMPONENTS_MODULES = [
    MatDialogModule,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        GlobalReduceModule,
        MomentModule,
        RouterModule,
        // QuicklinkModule,
        MATERIAL_COMPONENTS_MODULES,
    ],
    declarations: [
        ConfirmDialogComponent,
    ],
    entryComponents: [
        ConfirmDialogComponent,
    ],
    exports: [
        // QuicklinkModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        GlobalReduceModule,
        MomentModule,
        RouterModule,
        ConfirmDialogComponent,
        MATERIAL_COMPONENTS_MODULES,
    ]
})
export class SharedModule { }
