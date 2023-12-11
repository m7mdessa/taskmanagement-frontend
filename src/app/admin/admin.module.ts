import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProjrctsComponent } from './projrcts/projrcts.component';
import { SprintsComponent } from './sprints/sprints.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevelopersComponent } from './developers/developers.component';
import { SprintTasksComponent } from './sprint-tasks/sprint-tasks.component';
import { UsersLoginsComponent } from './userslogins/userslogins.component';


@NgModule({
  declarations: [
    ProjrctsComponent,
    SprintsComponent,
    SidebarComponent,
    DashboardComponent,
    DevelopersComponent,
    SprintTasksComponent,
    UsersLoginsComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

  ]
})
export class AdminModule { }
