import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class developerguardGuard implements CanActivate {
    constructor(private router: Router, private toastr: ToastrService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            if (state.url.indexOf('developer') >= 0) {
              const user:any  = localStorage.getItem('user');
              const userData = JSON.parse(user);
              
              var roleId = userData.RoleId; 
              console.log(user,"user");
              console.log(roleId,"roleId");
      
                if (roleId === '2') {
                  return true;
                } 
                else {
                  this.router.navigate(['Notfound']);

                    return false;
                }
                
            }

            return true;

        }else {
          this.router.navigate(['']);
          this.toastr.warning('you are not autherize !!')
          return false;
        }
    }
    
}