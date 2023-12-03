import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
//import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},

  {path:'register',component:RegisterComponent},

  //{path:'ForgotPassword',component:ForgotpasswordComponent},

  //{path:'ResetPassword',component:ResetpasswordComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
