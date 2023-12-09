import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperRoutingModule } from './developer-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        DeveloperRoutingModule,
        SharedModule
    ]
})
export class DeveloperModule { }
