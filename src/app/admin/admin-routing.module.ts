import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjrctsComponent } from './projrcts/projrcts.component';
import { SprintsComponent } from './sprints/sprints.component';
import { TasksComponent } from './tasks/tasks.component';
import { DevelopersComponent } from './developers/developers.component';

const routes: Routes = [  

{path:'Projrcts', component:ProjrctsComponent},

{path:'', component:DashboardComponent},

{path:'Sprints', component:SprintsComponent},

{path:'Tasks', component:TasksComponent},
{path:'Developers', component:DevelopersComponent},


//{path:'Users-Logins', component:UsersLoginsComponent},

//{path:'Roles', component:RolesComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
