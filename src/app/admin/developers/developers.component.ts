import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeveloperService } from 'src/app/service/developer.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  developers: any[] = [];
  developer: any;
  hide = true;
  hidee = true;
  emailAlreadyExists: boolean = false;
  usernameAlreadyExists: boolean = false;

    constructor(private developerService: DeveloperService,private dialog:MatDialog,private toastr: ToastrService) {}
  
 
    ngOnInit(): void {
      this.getAll();
  
    }
    
    getAll() {
      this.developerService.getAll().subscribe((developers) => {
        this.developers = developers;
      });
  
    }

 
    form :FormGroup = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  
    });
    
    edit :FormGroup = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });


    matchError() {
      if (this.form.controls['password'].value === this.form.controls['confirmPassword'].value) {
        this.form.controls['confirmPassword'].setErrors(null);
      } else {
        this.form.controls['confirmPassword'].setErrors({ misMatch: true });
      }
    }
    
  
OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }

  OpenDialogDetail(id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.developerService.getById(id).subscribe( (developer) => {
        this.developer = developer;
      
      });  
    }


  openEditDailog(developer: any){
    this.edit.setValue({
      id: developer.id,
      firstName: developer.firstName,
      lastName: developer.lastName,
      email: developer.email,
      city: developer.city,
      state: developer.state,
      street: developer.street,
      zipCode: developer.zipCode,
      country: developer.country,
    });
    
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.developerService.update(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('Developer updated successfully:', response);
              this.toastr.success('Developer updated successfully.', 'Success');
              this.getAll(); 
              this.dialog.closeAll();      
    
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update Developer:', error);
                this.toastr.error('Error while update Developer.', 'Error'); 
      
            }
          );       
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

  openDeleteDailog(id:number){
    console.log(id)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.developerService.delete(id).subscribe(
            () => {
              this.developers = this.developers.filter((developer) => developer.id !== id);
              console.log('Developer deleted successfully.');
              this.toastr.success('Developer deleted successfully.', 'Success');

              this.dialog.closeAll(); 
              this.getAll();
     
            },
            (error) => {
              console.log('Error while deleting developer:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

   add() {

      this.developerService.add(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Developer Added successfully.', 'Success');
        this.getAll();
        this.dialog.closeAll();      
        this.form.reset();

      },(error) => {
        console.log( this.form.value);

        console.log('Error while add employee:', error);
          this.toastr.error('Error while add employee.', 'Error'); 
          if (error.error && error.error.error) {
            if (error.error.error === 'email already exists') {
              this.emailAlreadyExists = true;
            }
          } 
          if (error.error && error.error.error) {
            if (error.error.error === 'developer name already exists') {
              this.usernameAlreadyExists = true;
            }
          
          }

      });
    }
}
