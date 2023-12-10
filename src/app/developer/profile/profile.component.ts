import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeveloperService } from 'src/app/service/developer.service';
import { ProjectService } from 'src/app/service/project.service';
import { SprintTaskService } from 'src/app/service/sprint-task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callPasswordDailog') callPasswordDailog!:TemplateRef<any>
  @ViewChild('callInformationDailog') callInformationDailog!:TemplateRef<any>

  profile: any;
  projects: any[]=[];
  hide = true;
  hidee = true;

  constructor(private developerService: DeveloperService,private taskService: SprintTaskService,private projectService: ProjectService,private toastr: ToastrService,private dialog:MatDialog ) {}

  
  ngOnInit(): void {
  
    this.getProfile();
    this.getSprintTasks();
  }

  edit :FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),

  });
  
  passwordForm : FormGroup = new FormGroup({ 
    developerId: new FormControl(),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
   });

    matchError() {
      if (this.passwordForm.controls['password'].value === this.passwordForm.controls['confirmPassword'].value) {
        this.passwordForm.controls['confirmPassword'].setErrors(null);
      } else {
        this.passwordForm.controls['confirmPassword'].setErrors({ misMatch: true });
      }
    }
    
   
   openEditDailog(){
    this.dialog.open(this.callEditDailog);

   }

  openPasswordDailog(){

    
    const dialogRef= this.dialog.open(this.callPasswordDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          const developer = localStorage.getItem('user');
          if (developer !== null) {
      
            const developerData = JSON.parse(developer);
          
            var developerId = developerData.DeveloperId;
          
          } else {
            console.log('No user data found in local storage.');
          }

          this.passwordForm.get('developerId')?.setValue(developerId);
          this.developerService.updatePassword(this.passwordForm.value).subscribe(
            (responsee) => {
              console.log( this.passwordForm.value);
      
              console.log('Password updated successfully:', responsee);
              this.toastr.success('Password updated successfully.', 'Success');
               this.passwordForm.reset();
               this.getProfile();      
               this.dialog.closeAll();      
            },
            (error) => {
              console.log( this.passwordForm.value);
      
              console.log('Error while update Password :', error);
                this.toastr.error('Error while update Password .', 'Error'); 
      
            }
          );   
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }


 

  getSprintTasks() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
  
      this.projects.forEach((project) => {

        const developer = localStorage.getItem('user');
        if (developer !== null) {
    
          const developerData = JSON.parse(developer);
        
          var developerId = developerData.DeveloperId;
        
        } else {
          console.log('No user data found in local storage.');
        }

        const projectId = project.id;
  
        this.developerService.getDeveloperTask(projectId,developerId).subscribe((sprintTasks) => {
          project.sprintTasks = sprintTasks;
          console.log("sprintTasks", sprintTasks);


        });
      });
    });
  }

  openInformationDailog(developer: any){
    this.edit.setValue({
      id: developer.id,
      firstName: developer.firstName,
      lastName: developer.lastName,
      city: developer.city,
      state: developer.state,
      street: developer.street,
      zipCode: developer.zipCode,
      country: developer.country,
    
    });
    
    const dialogRef= this.dialog.open(this.callInformationDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.developerService.updateProfile(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('Information updated successfully:', response);
              this.toastr.success('Information updated successfully.', 'Success');
              this.getProfile(); 
              this.dialog.closeAll();      
    
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update Information:', error);
                this.toastr.error('Error while update Information.', 'Error'); 
      
            }
          );       
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }
  getProfile() {
    const developer = localStorage.getItem('user');
    if (developer !== null) {

      const developerData = JSON.parse(developer);
    
      var id = developerData.DeveloperId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.developerService.getProfile(id).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }
  
 

   
 
}
