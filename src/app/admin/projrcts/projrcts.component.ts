import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-projrcts',
  templateUrl: './projrcts.component.html',
  styleUrls: ['./projrcts.component.css']
})
export class ProjrctsComponent {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  projects: any[] = [];
  project: any;
  

    constructor(private projectService: ProjectService,private dialog:MatDialog,private toastr: ToastrService) {}
  
 
    ngOnInit(): void {
      this.getAll();
  
    }
    
    getAll() {
      this.projectService.getAll().subscribe((projects) => {
        this.projects = projects;
      });
  
    }

 
    form :FormGroup = new FormGroup({
      projectName: new FormControl('',[Validators.required]),
      projectDescription: new FormControl('',[Validators.required]),

   
    });
    
    edit :FormGroup = new FormGroup({
      id: new FormControl(''),
      projectName: new FormControl('',[Validators.required]),
      projectDescription: new FormControl('',[Validators.required]),

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }

  OpenDialogDetail(id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.projectService.getById(id).subscribe( (project) => {
        this.project = project;
      
      });  
    }


  openEditDailog(project: any){
    this.edit.setValue({
      id: project.id,
      projectName: project.projectName,
      projectDescription: project.projectDescription,

    });
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.projectService.update(this.edit.value).subscribe(
            (response) => {
              console.log( this.edit.value);
      
              console.log('Project updated successfully:', response);
              this.toastr.success('Project updated successfully.', 'Success');
              this.getAll(); 
              this.dialog.closeAll();      
    
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update Project:', error);
                this.toastr.error('Error while update Project.', 'Error'); 
      
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
          this.projectService.delete(id).subscribe(
            () => {
              this.projects = this.projects.filter((project) => project.id !== id);
              console.log('Project deleted successfully.');
              this.toastr.success('Project deleted successfully.', 'Success');

              this.dialog.closeAll(); 
              this.getAll();
     
            },
            (error) => {
              console.log('Error while deleting Project:', error);
            }
          );         
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

   add() {

      this.projectService.add(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Project Added successfully.', 'Success');
        this.getAll();
        this.dialog.closeAll();      
        this.form.reset();

      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
}
