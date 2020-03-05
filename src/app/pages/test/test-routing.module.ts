import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/test.component';

const routes: Routes = [{
  path: '',
  component: TestComponent,
  data: {
    pageTitle: 'test.title'
  }
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class TestRoutingModule { }
