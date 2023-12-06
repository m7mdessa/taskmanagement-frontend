import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

  constructor( private router: Router,private dialog:MatDialog) {}

  ngOnInit(): void {

  }


  
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}