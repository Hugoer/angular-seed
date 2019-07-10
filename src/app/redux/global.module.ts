import { NgModule, Optional, SkipSelf } from '@angular/core';

import { compReducers } from './global.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        // CommonModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('main', compReducers)
    ],
    exports: [
        // CommonModule,
        StoreModule
    ]
})

export class GlobalReduceModule {
    constructor(@Optional() @SkipSelf() parentModule: GlobalReduceModule) {
        if (parentModule) {
            throw new Error('GlobalReduceModule has already been loaded. You should only import Core modules in the CoreModule only.');
        }
    }
}
