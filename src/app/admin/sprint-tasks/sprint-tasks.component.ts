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


    constructor(private taskService: SprintTaskService,  private sprintService: SprintService,  private developerService: DeveloperService
      ,  private projectService: ProjectService ,private toastr: ToastrService,private dialog:MatDialog) {}
  
 
    ngOnInit() {
      this.getDevelopers();
      this.getProjects();
      this.getSprintTasks();
    }
    
    
    getProjects() {
      this.projectService.getAll().subscribe((projects) => {
        this.projects = projects;
    
        if (this.selectedProjectId) {

          this.sprintService.getAll(this.selectedProjectId).subscribe((sprints) => {
            this.sprints = sprints;
          });
  
        }
      });
    }
    
    
    getSprintTasks() {
      this.projectService.getAll().subscribe((projects) => {
        this.projects = projects;
    
        this.projects.forEach((project) => {
          const projectId = project.id;
    
          this.taskService.getAll(projectId).subscribe((sprintTasks) => {
            project.sprintTasks = sprintTasks;
            
            console.log("sprintTasks", sprintTasks);


          });
        });
      });
    }
    

  getDevelopers() {
    this.developerService.getAll().subscribe((developers) => {
      this.developers = developers;
    });

  }
  formatTaskDuration(taskDuration: number): string {
    const days = Math.floor(taskDuration / (60 * 24));
    const hours = Math.floor((taskDuration % (60 * 24)) / 60);
    const minutes = taskDuration % 60;

    const formattedDuration = [];

    if (days > 0) {
      formattedDuration.push(`${days}d`);
    }

    if (hours > 0) {
      formattedDuration.push(`${hours}h`);
    }

    if (minutes > 0 || formattedDuration.length === 0) {
      formattedDuration.push(`${minutes}m`);
    }

    return formattedDuration.join(' ');
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
      projectId: new FormControl('',[Validators.required]),

    });

OpenDialogAdd(){
    
  this.dialog.open(this.callCreateDialog);
  
  }
  OpenDialogDetail(id: number) {
    this.projectService.getById(id).subscribe((project) => {
      // Assuming projectService.getById returns a single project
      const projectId = project.id;
  
      // Now use the projectId to fetch tasks
      this.taskService.getById(projectId,id).subscribe((sprintTasks) => {
        this.sprintTasks = sprintTasks;
  
        // Open the dialog or perform any other logic with the sprintTasks
        this.dialog.open(this.callDetailDailog);
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
      projectId: sprintTask.projectId,

    });

    const dialogRef= this.dialog.open(this.callEditDailog);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
        if (result == 'yes') {
          

          this.taskService.update(this.edit.value).subscribe({
            next: (response) => {
              console.log("edit", this.edit.value);
              console.log('Task updated successfully:', response);
              this.toastr.success('Task updated successfully.', 'Success');
              this.getProjects(); 
              this.getSprintTasks();
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
                this.getSprintTasks();

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
        this.getSprintTasks();
        this.dialog.closeAll();
        this.form.reset();
      },
      error: () => {
        this.toastr.error('Something went wrong!', 'Error');
      }
    });
    
    }
}
