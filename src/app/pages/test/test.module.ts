import { NgModule } from '@angular/core';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { SharedModule } from '@app/shared/shared.module';

const MATERIAL_TEST_MODULES = [
];

@NgModule({
  imports: [
    SharedModule,
    MATERIAL_TEST_MODULES,
    TestRoutingModule,
  ],
  declarations: [
    TestComponent,
  ],
  exports: [
    MATERIAL_TEST_MODULES,
  ],
})
export class TestModule { }
