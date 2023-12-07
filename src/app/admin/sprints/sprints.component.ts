import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
import { SprintService } from 'src/app/service/sprint.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  projects: any[] = [];
  sprints: any[] = [];
  sprint: any;
  

    constructor(private projectService: ProjectService,  private sprintService: SprintService,private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit(): void {
        this.getProjects();
    }
    
  

    
  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
      const id = this.projects.map((project) => project.id) as unknown as number;

      this.sprintService.getAll(id).subscribe((sprints) => {
        this.sprints = sprints;
      });
  
    });

  }


 
    form :FormGroup = new FormGroup({
      sprintName: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      projectId: new FormControl('',[Validators.required]),
    });

    edit :FormGroup = new FormGroup({
      id: new FormControl(''),
      sprintName: new FormControl('',[Validators.required]),
      projectId: new FormControl('',[Validators.required]),

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }
  OpenDialogDetail(projectId:number,id:number){
    
    this.dialog.open(this.callDetailDailog);
    this.sprintService.getById(projectId,id).subscribe( (sprint) => {
        this.sprint = sprint;
      
      });  
    }


  openEditDailog(sprint: any){
    this.edit.setValue({
      id: sprint.id,
      projectId: sprint.projectId,
      sprintName: sprint.sprintName,
    
    });
    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.sprintService.update(this.edit.value).subscribe(
            () => {
              console.log( this.edit.value);
      
              this.toastr.success('Sprint updated successfully.', 'Success');
              this.getProjects(); 
              this.dialog.closeAll();      
    
            
            },
            (error) => {
              console.log( this.edit.value);
      
              console.log('Error while update Sprint:', error);
                this.toastr.error('Error while update Sprint.', 'Error'); 
      
            }
          );       
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

   openDeleteDialog(projectId: number, sprintid: number) {
    console.log(projectId, sprintid);
  
    const dialogRef = this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.sprintService.delete(projectId, sprintid).subscribe(
            () => {
              this.sprints = this.sprints.filter((sprint) => sprint.id !== sprintid);
  
              console.log('Sprint deleted successfully.');
              this.toastr.success('Sprint deleted successfully.', 'Success');
  
              this.dialog.closeAll();
              this.getProjects();
            },
            (error) => {
              console.log('Error while deleting Sprint:', error);
            }
          );
        } else if (result === 'no') {
          console.log('Thank you');
        }
      }
    });
  }
  
   add() {

      this.sprintService.add(this.form.value).subscribe((resp:any)=>{

        this.toastr.success('Sprint Added successfully.', 'Success');
        this.getProjects();
        this.dialog.closeAll();      
        this.form.reset();

      },err=>{
        
        this.toastr.error('Something went wrong !!', 'error');
  
      });
    }
}
