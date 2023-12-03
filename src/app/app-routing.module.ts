import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { DeveloperModule } from './developer/developer.module';
import { adminguardGuard } from './adminguard.guard';
import { LoginComponent } from './auth/login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { developerguardGuard } from './developerguard.guard';

const routes: Routes = [

  {path:'admin', loadChildren:()=>AdminModule , canActivate:[adminguardGuard]},

  {path:'developer', loadChildren:()=>DeveloperModule, canActivate:[developerguardGuard]},

  {path:'auth', loadChildren:()=>AuthModule},
  
  { path:'',  component:LoginComponent},

  { path:'Notfound',  component:NotfoundComponent},



  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
