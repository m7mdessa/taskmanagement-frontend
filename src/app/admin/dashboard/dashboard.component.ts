import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
//import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('reportTable', { static: true }) reportTable: ElementRef | undefined;
  numberOfUsers: number = 0;
  numberOfDepartments: number = 0;
  numberOfEmployees: number = 0;
  constructor() {}

  
  ngOnInit(): void {
  

  }




 
}