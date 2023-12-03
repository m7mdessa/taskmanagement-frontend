import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
errorMessage: string | undefined;

  constructor(public auth: AuthService,private router: Router) {

  }
 

  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
 

  loginError: string | null = null; 

  login() {
    this.auth.Login(this.userName, this.password)
    this.errorMessage = 'Invalid username or password';
  }


 
  toRegister(){
    this.router.navigate(['auth/register']);
  }
  toForgotPassword(){
    this.router.navigate(['auth/ForgotPassword']);
  }
}
