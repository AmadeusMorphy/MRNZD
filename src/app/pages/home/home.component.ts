import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.checkLoginStatus()
  }


  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
    }else{
      this.router.navigateByUrl("/login")
    }
  }
  

  logout(): void {
    localStorage.removeItem('userEmail'); 
    localStorage.removeItem('isLoggedIn'); 
    console.log('User logged out successfully');
    

    this.router.navigate(['/login']);
  }
}
