import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  loginForm: FormGroup;
  isLoading: boolean = false;

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

  onSubmit(): void {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    const emailLowercase = email.toLowerCase();

    if (this.loginForm.valid) {
      console.log('Form is valid. Checking database...');

      this.firebaseService.getData('users').then((data) => {

        if (data && data.email === emailLowercase && data.password === password) {
          console.log('Login successful');

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', emailLowercase);
          this.isLoading = false;
          this.router.navigateByUrl('/home');

        } else {
          this.showWarn()
          console.error('Invalid username or password');
          this.isLoading = false;
        }
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        this.isLoading = false;
      });
    } else {
      console.error('Form is invalid');
      this.isLoading = false;
    }
  }


  showWarn() {
    this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Wrong email or password' });
  }
}
