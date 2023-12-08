import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public http: HttpClient,private router: Router,private toastr:ToastrService) { }


  Register(Register: any): Observable<any>{

    return  this.http.post('https://localhost:7212/api/Auth/Register/',Register);
 
  }

  Login(username: any, password: any) {

 
    var Login = {
      username: username.value.toString(),
      password: password.value.toString(),
    };

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    
    this.http.post('https://localhost:7212/api/Auth/Login/', Login, requestOptions).subscribe((res: any) => {
     
      const responce = { token: res.toString() }
      localStorage.setItem('token', responce.token);
      
      let data: any = jwtDecode(responce.token);
 
      localStorage.setItem('user', JSON.stringify(data));
  
      if (data.RoleId == "2") {
        this.toastr.success('Welcome On Admin Dashboard');
        this.router.navigate(['admin']);
      } else if (data.RoleId == "3") {
        this.toastr.success('Welcome On Devloper Profile');
        this.router.navigate(['developer/Profile']);
      } else {
        this.toastr.error('Something wrong!!');
        this.router.navigate(['']);
      }
    });
  }
  


  Forgotpassword(Forgotpassword: any): Observable<any>{

    return  this.http.post('https://localhost:7212/api/Auth/Forgotpassword/',Forgotpassword);
 
  }

  Resetpassword(Resetpassword: any): Observable<any>{

    return  this.http.post('https://localhost:7212/api/Auth/Resetpassword/',Resetpassword);
 
  }

 IsUsernameTaken(username: string): Observable<boolean> {
    
    return this.http.get<boolean>('https://localhost:7212/api/Auth/checkUsername/'+username);

  }


 IsEmailTaken(email: string): Observable<boolean> {
    
   return this.http.get<boolean>('https://localhost:7212/api/Auth/checkEmail/'+email);

}

  isUsernameOrEmailTaken(username: string, email: string): Observable<{ usernameTaken: boolean, emailTaken: boolean }> {

    return forkJoin([
      this.http.get<boolean>('https://localhost:7212/api/Auth/checkUsername/'+username),
      this.http.get<boolean>('https://localhost:7212/api/Auth/checkEmail/'+email)
    ]).pipe(
      map(([usernameTaken, emailTaken]) => ({
        usernameTaken: usernameTaken,
        emailTaken: emailTaken
      }))
    );
  }
}

