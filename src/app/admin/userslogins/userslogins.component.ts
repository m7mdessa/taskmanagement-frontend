import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
//import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr'; 
import { MatDialog } from '@angular/material/dialog';
import { UserloginService } from 'src/app/service/userlogin.service';
import { DeveloperService } from 'src/app/service/developer.service';

@Component({
  selector: 'app-users-logins',
  templateUrl: './userslogins.component.html',
  styleUrls: ['./userslogins.component.css'],

})
export class UsersLoginsComponent implements OnInit {
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  userLogin: any;
  userLogins: any[] = [];
  developers: any[] = [];


  constructor( private userLoginService: UserloginService,private developerService: DeveloperService,private toastr: ToastrService,private dialog:MatDialog) {}


  ngOnInit(): void {
    this.getDevelopers();
 

  }

  getDevelopers() {
    this.developerService.getAll().subscribe((developers) => {
      this.developers = developers;
  
      this.developers.forEach((developer) => {
        const id = developer.id;
  
        this.userLoginService.getAll(id).subscribe((userLogins) => {
          developer.userLogins = userLogins;
        });


        
      });
    });
  }

 
  OpenDialogDetail(developerId :number){
    
    this.dialog.open(this.callDetailDailog);
    this.userLoginService.getById(developerId).subscribe( (userLogin) => {
        this.userLogin = userLogin;
      
      });  
    }
   
  openDeleteDailog(developerId:number){
    console.log(developerId)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.userLoginService.delete(developerId).subscribe(
            () => {
              this.userLogins = this.userLogins.filter((user) => user.developerId !== developerId);
              console.log('User Login deleted successfully.');
              this.dialog.closeAll(); 
              this.getDevelopers();
     
            },
            (error) => {
              console.log('Error while deleting user login:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
     
 
   }


}

function hashPassword(password: any, string: any) {
  throw new Error('Function not implemented.');
}

