import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoUserComponent } from './no-user/no-user.component';

const routes: Routes = [
    {
        path: '',
        component: NoUserComponent,
        data: {
            pageTitle: 'nouser.title'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class NoUserRoutingModule { }
