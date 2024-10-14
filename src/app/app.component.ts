import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginForm: FormGroup;
  constructor(
      private firebaseService: FirebaseService,
      private fb: FormBuilder,
      private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


  }



  // ngOnInit() {
  //   const dataPath = 'users'

  //   this.firebaseService.getData(dataPath).then((data) => {
  //     console.log("Your data: ", data)
  //   })

  // }


  // onSubmit(): void {
  //   console.log('Login button clicked');
  
  //   const { email, password } = this.loginForm.value;
  //   console.log('Form data:', this.loginForm.value);
  
  //   if (this.loginForm.valid) {
  //     console.log('Form is valid. Checking database...');
      
  //     this.firebaseService.getData('users').then((data) => {
  //       console.log('Data from Firebase:', data);
  
  //       if (data && data.email === email && data.password === password) {
  //         console.log('Login successful');

  //         localStorage.setItem('isLoggedIn', 'true');
  //         localStorage.setItem('userEmail', email);

  //       } else {
  //         console.error('Invalid username or password');

  //       }
  //     }).catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
  //   } else {
  //     console.error('Form is invalid');

  //   }
  // }

  // checkLoginStatus(): void {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn');
  //   if (isLoggedIn === 'true') {
  //     console.log('User is already logged in, redirecting...');
  //     this.router.navigateByUrl("/home")
  //   }
  // }
  

  // postTest() {
  //   this.firebaseService.postData('username123', 'user@example.com', 'password123');
  // }
}
