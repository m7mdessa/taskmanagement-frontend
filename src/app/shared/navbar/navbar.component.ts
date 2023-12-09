import { Component,HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isSticky = false;
  username :any;


 

  ngOnInit() {
   // this.getProfile() ;
    this.loadStickyState();
    this.username

    const user = localStorage.getItem('user');
    if (user !== null) {

      const userData = JSON.parse(user);
        this.username  = userData.Name;

    
    } else {
      console.log('No user data found in local storage.');
    }
  }
 


  user?: any = localStorage.getItem('user');

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset;

    if (offset > 100) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }

    this.saveStickyState();
  }

  saveStickyState() {
    localStorage.setItem('isSticky', JSON.stringify(this.isSticky));
  }

  loadStickyState() {
    const stickyState = localStorage.getItem('isSticky');
    if (stickyState) {
      this.isSticky = JSON.parse(stickyState);
    }
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['']);
}

}
