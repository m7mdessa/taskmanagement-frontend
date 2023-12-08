import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeveloperService } from 'src/app/service/developer.service';
import { ProjectService } from 'src/app/service/project.service';
import { SprintService } from 'src/app/service/sprint.service';
import { SprintTaskService } from 'src/app/service/sprint-task.service';

@Component({
  selector: 'app-sprint-tasks',
  templateUrl: './sprint-tasks.component.html',
  styleUrls: ['./sprint-tasks.component.css']
})
export class SprintTasksComponent {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  sprintTasks: any[] = [];
  sprints: any[] = [];
  developers: any[] = [];
  sprintTask: any;
  projects: any[]=[];


    constructor(private taskService: SprintTaskService,  private sprintService: SprintService,  private developerService: DeveloperService
      ,  private projectService: ProjectService ,private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit(): void {
      this.getDevelopers();
      this.getProjects();

    }
    
   
  
  getProjects() {
    this.projectService.getAll().subscribe((projects) => {
      this.projects = projects;
      const id = this.projects.map((project) => project.id) as unknown as number;

      this.sprintService.getAll(id).subscribe((sprints) => {
        this.sprints = sprints;
      });
      
      this.taskService.getAll(id).subscribe((sprintTasks) => {
        this.sprintTasks = sprintTasks;
      });
    });

  }


  getDevelopers() {
    this.developerService.getAll().subscribe((developers) => {
      this.developers = developers;
    });

  }
 
    form :FormGroup = new FormGroup({
      taskName: new FormControl('',[Validators.required]),
      taskDescription: new FormControl('',[Validators.required]),
      taskDuration: new FormControl('',[Validators.required]),
      sprintId: new FormControl('',[Validators.required]),
      developerId: new FormControl('',[Validators.required]),
      projectId: new FormControl('',[Validators.required]),


    });
    
    edit :FormGroup = new FormGroup({
      id: new FormControl(''),
      sprintId: new FormControl('',[Validators.required]),
      taskName: new FormControl('',[Validators.required]),
      taskDescription: new FormControl('',[Validators.required]),
      developerId: new FormControl('',[Validators.required]),
      taskStatus: new FormControl('',[Validators.required]),

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }

  OpenDialogDetail(id:number){
    
      this.projectService.getAll().subscribe((projects) => {
        this.projects = projects;
        const projectId = this.projects.map((project) => project.id) as unknown as number;

    this.dialog.open(this.callDetailDailog);
    this.taskService.getById(projectId,id).subscribe( (sprintTask) => {
        this.sprintTask = sprintTask;
      
      });
      
    });

    }


  openEditDailog(sprintTask: any){
    this.edit.setValue({
      id: sprintTask.id,
      sprintId: sprintTask.sprintId,
      taskName: sprintTask.taskName,
      taskDescription: sprintTask.taskDescription,
      developerId: sprintTask.developerId,
      taskStatus: sprintTask.taskStatus,
    });

    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          
          this.projectService.getAll().subscribe((projects) => {
            this.projects = projects;
            const projectId = this.projects.map((project) => project.id) as unknown as number;

          this.taskService.update(projectId,this.edit.value).subscribe({
            next: (response) => {
              console.log("edit", this.edit.value);
              console.log('Task updated successfully:', response);
              this.toastr.success('Task updated successfully.', 'Success');
              this.getProjects(); 
              this.dialog.closeAll();
            },
            error: (error) => {
              console.log(this.edit.value);
              console.log('Error while updating Task:', error);
              this.toastr.error('Error while updating Task.', 'Error');
            }
          });
        });
                
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

  openDeleteDailog(sprintId:number ,sprintTaskId:number){
    console.log(sprintId)

    const dialogRef= this.dialog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          
          this.projectService.getAll().subscribe((projects) => {
            this.projects = projects;
            const projectId = this.projects.map((project) => project.id) as unknown as number;
      
            this.taskService.delete(projectId, sprintId, sprintTaskId).subscribe({
              next: () => {
                this.sprintTasks = this.sprintTasks.filter((task) => task.sprintId !== sprintId);
                console.log('Task deleted successfully.');
                this.toastr.success('Task deleted successfully.', 'Success');
                this.dialog.closeAll();
                this.getProjects();
              },
              error: (error) => {
                console.log('Error while deleting Task:', error);
              }
            });
            
        
          });
                
        } else if (result == 'no') {
          console.log("Thank you");
        }
        
           
       }
 
    })
   }

   add() {

    this.taskService.add(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Task added successfully.', 'Success');
        this.getProjects();
        this.dialog.closeAll();
        this.form.reset();
      },
      error: () => {
        this.toastr.error('Something went wrong!', 'Error');
      }
    });
    
    }
}
