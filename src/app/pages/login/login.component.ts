import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
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
    private messageService: MessageService,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
    // this.firebaseService.getApi().subscribe(
    //   (res: any) => {
    //     console.log('REST api results: ', Object.values(res).map((user:any) => user.email));
    //   }, (error) => {
    //     console.error('error stuff: ', error)
    //   }
    // )
    const checkUser = localStorage.getItem('userEmail')
    
    if(checkUser){
      this.router.navigateByUrl('/home')
    }
  }


  /*****************FIREBASE LOGGING IN********************/

  onSubmit(): void {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    const emailLowercase = email.toLowerCase();

    if (this.loginForm.valid) {
      console.log('Form is valid. Checking database...');

      this.firebaseService.getData('users').then((data) => {

        if (data && data.email === emailLowercase && data.password === password) {
          console.log('Login successful');

          this.authService.login(emailLowercase, data.username);
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
/******************************************************************/



/***REST API FIREBASE LOGIN AFTER FILTERING [1] WHICH IS THE USERS*/
  onLogin(): void {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    const emailLowercase = email.toLowerCase();


    this.firebaseService.signin(emailLowercase, password).subscribe(
      (user) => {
        if (user) {
          this.isLoading = false;
          this.authService.login(emailLowercase, user.username);
          this.router.navigate(['/home']);
        } else {
          this.showWarn()
          console.log("invalid stuff");
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false
        console.error('Error during login:', error);
      }
    );
  }
/*******************************************************************************/

  showWarn() {
    this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Wrong email or password' });
  }
}
