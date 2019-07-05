import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { compReducers } from './global.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('main', compReducers)
    ],
    exports: [
        CommonModule,
        StoreModule
    ]
})

export class GlobalReduceModule { }
