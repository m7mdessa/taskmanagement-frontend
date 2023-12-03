import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProjrctsComponent } from './projrcts/projrcts.component';
import { SprintsComponent } from './sprints/sprints.component';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
  declarations: [
    ProjrctsComponent,
    SprintsComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
