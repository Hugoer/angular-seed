import { NgModule } from '@angular/core';
import { NoUserRoutingModule } from './nouser.routes';
import { NoUserComponent } from './no-user/no-user.component';
import { SharedModule } from '@app/shared/shared.module';

const MATERIAL_MODULES = [];

@NgModule({
  imports: [NoUserRoutingModule, MATERIAL_MODULES, SharedModule],
  exports: [],
  declarations: [NoUserComponent],
  entryComponents: [NoUserComponent],
  providers: [],
})
export class NoUserModule {}
