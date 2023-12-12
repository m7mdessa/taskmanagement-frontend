import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeveloperService } from 'src/app/service/developer.service';
import { ProjectService } from 'src/app/service/project.service';
import { SprintService } from 'src/app/service/sprint.service';
import { SprintTaskService } from 'src/app/service/sprint-task.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sprint-tasks',
  templateUrl: './sprint-tasks.component.html',
  styleUrls: ['./sprint-tasks.component.css']
})
export class SprintTasksComponent {
[x: string]: any;
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  @ViewChild('callEditDailog') callEditDailog!:TemplateRef<any>
  @ViewChild('callDetailDailog') callDetailDailog!:TemplateRef<any>

  sprintTasks: any[] = [];
  sprints: any[] = [];
  developers: any[] = [];
  sprintTask: any;
  projects: any[]=[];

  selectedProjectId: any;

  validationErrors: string = '';

    constructor(private taskService: SprintTaskService,  private sprintService: SprintService,  private developerService: DeveloperService
      ,  private projectService: ProjectService ,private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit() {
      this.getDevelopers();
      this.getProjects();
    }
    
    
    getProjects() {
      this.projectService.getAll().subscribe((projects) => {
        this.projects = projects;
    
        if (this.selectedProjectId) {
          this.sprintService.getAll(this.selectedProjectId).subscribe((sprints) => {
            this.sprints = sprints;
          });
        }
    
        this.projects.forEach((project) => {
          const projectId = project.id;
    
          this.taskService.getAll(projectId).subscribe((sprintTasks) => {
            sprintTasks.forEach((task) => {
              task.projectId = projectId;
            });
        
            const existingProject = this.projects.find(p => p.id === projectId);
            if (existingProject) {
              existingProject.sprintTasks = sprintTasks;
            } else {
              project.sprintTasks = sprintTasks;
              this.projects.push(project);
            }
          });
        });
    
      });
    }
    
  

  getDevelopers() {
    this.developerService.getAll().subscribe((developers) => {
      this.developers = developers;
    });

  }

    form :FormGroup = new FormGroup({
      taskName: new FormControl(),
      taskDescription: new FormControl('',[Validators.required]),
      taskDuration: new FormControl('',[Validators.required]),
      sprintId: new FormControl('',[Validators.required]),
      developerId: new FormControl('',[Validators.required]),
      projectId: new FormControl('',[Validators.required]),


    });
    
    edit :FormGroup = new FormGroup({
      id: new FormControl(''),
      sprintId: new FormControl('',[Validators.required]),
      taskName: new FormControl(''),
      taskDescription: new FormControl('',[Validators.required]),
      developerId: new FormControl('',[Validators.required]),
      taskStatus: new FormControl('',[Validators.required]),
      projectId: new FormControl('',[Validators.required]),

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }

  OpenDialogDetail(projectId:number,id:number){
    this.dialog.open(this.callDetailDailog);
    this.taskService.getById(projectId,id).subscribe( (sprintTask) => {
        this.sprintTask = sprintTask;
      
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
      projectId: sprintTask.projectId,

    });

    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          this.projectService.getAll().subscribe((projects) => {
            this.projects = projects;
        
            this.projects.forEach((project) => {
              const projectId = project.id 
              this.edit.get('projectId')?.setValue(projectId);

            });
          });

          this.taskService.update(this.edit.value).subscribe({
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
      error: (error) => {

        if (error.status === 400) {
          if (Array.isArray(error.error)) {
            this.validationErrors =  error.error.join(', ');
          } else if (typeof error.error === 'string') {
            this.validationErrors =  error.error;
          } else {
            this.validationErrors = 'An unexpected validation error occurred.';
          }
        } else {
          this.validationErrors = 'An unexpected error occurred.';
        }
        this.toastr.error('Something went wrong!', 'Error');
      }
    });
    
    }

    
}
