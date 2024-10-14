import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm: FormGroup;
  constructor(
      private firebaseService: FirebaseService,
      private fb: FormBuilder,
      private router: Router,
      private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  ngOnInit() {

  }


  onSubmit(): void {

    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      console.log('Form is valid. Checking database...');
      
      this.firebaseService.getData('users').then((data) => {
  
        if (data && data.email === email && data.password === password) {
          console.log('Login successful');

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
          this.router.navigateByUrl('/home')

        } else {
          this.showWarn()
          console.error('Invalid username or password');

        }
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('Form is invalid');

    }
  }

  showWarn() {
    this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Wrong email or password' });
}

}
