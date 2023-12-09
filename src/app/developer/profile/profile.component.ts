import { Component } from '@angular/core';
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

  profile: any;
  projects: any[]=[];

  constructor(private developerService: DeveloperService,private taskService: SprintTaskService,private projectService: ProjectService,private toastr: ToastrService,private dialog:MatDialog ) {}

  
  ngOnInit(): void {
  
    this.getProfile();
    this.getSprintTasks();
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
  
        this.taskService.getDeveloperTask(projectId,developerId).subscribe((sprintTasks) => {
          project.sprintTasks = sprintTasks;
          console.log("sprintTasks", sprintTasks);


        });
      });
    });
  }
  getProfile() {
    const developer = localStorage.getItem('user');
    if (developer !== null) {

      const developerData = JSON.parse(developer);
    
      var id = developerData.DeveloperId;
    
    } else {
      console.log('No user data found in local storage.');
    }
    this.developerService.getById(id).subscribe((profile) => {
      this.profile = profile;
      console.log('profile',profile);

    });
  }
  
 

   
 
}
