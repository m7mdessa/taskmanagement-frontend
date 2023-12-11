import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjrctsComponent } from './projrcts/projrcts.component';
import { SprintsComponent } from './sprints/sprints.component';
import { SprintTasksComponent } from './sprint-tasks/sprint-tasks.component';
import { DevelopersComponent } from './developers/developers.component';
import { UsersLoginsComponent } from './userslogins/userslogins.component';

const routes: Routes = [  

{path:'Projrcts', component:ProjrctsComponent},

{path:'', component:DashboardComponent},

{path:'Sprints', component:SprintsComponent},

{path:'Sprint-Tasks', component:SprintTasksComponent},

{path:'Developers', component:DevelopersComponent},


{path:'Users-Logins', component:UsersLoginsComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
