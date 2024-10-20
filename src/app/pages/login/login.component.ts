import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, FormsModule, ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  loginForm: FormGroup;
  isLoading: boolean = false;
  signUpForm: FormGroup;
  isSignUp = false;
  users: any[] = [];
  userId: any;
  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      dateCreated: new Date()
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

    if (checkUser) {
      this.router.navigateByUrl('/home')
    }
  }


  /*****************FIREBASE LOGGING IN********************/

  // onSubmit(): void {
  //   this.isLoading = true;
  //   const { email, password } = this.loginForm.value;

  //   const emailLowercase = email.toLowerCase();

  //   if (this.loginForm.valid) {
  //     console.log('Form is valid. Checking database...');

  //     this.firebaseService.getData('users').then((data) => {

  //       if (data && data.email === emailLowercase && data.password === password) {
  //         console.log('Login successful');

  //         this.authService.login(emailLowercase, data.username);
  //         this.isLoading = false;
  //         this.router.navigateByUrl('/home');

  //       } else {
  //         this.showWarn()
  //         console.error('Invalid username or password');
  //         this.isLoading = false;
  //       }
  //     }).catch((error) => {
  //       console.error('Error fetching user data:', error);
  //       this.isLoading = false;
  //     });
  //   } else {
  //     console.error('Form is invalid');
  //     this.isLoading = false;
  //   }
  // }
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

          // Set the username in localStorage immediately after login success
          localStorage.setItem('userName', user.username);  // Save username
          this.authService.login(emailLowercase, user.username);

          // Now that userName is in localStorage, fetch userId
          this.getUserIdFromLocalStorage();  // Proceed to get the userId
        } else {
          this.showWarn();
          console.log("Invalid login credentials");
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error during login:', error);
      }
    );
  }

  getUserIdFromLocalStorage() {
    const currentUser = localStorage.getItem('userName');
    if (!currentUser) {
      console.error("Error: currentUser is null in localStorage.");
      return;
    }

    this.firebaseService.getUsers().subscribe((data) => {
      // Convert the object to an array including the IDs
      this.users = Object.entries(data).map(([id, user]) => ({ id, ...user }));

      // Find the user by username from local storage
      const foundUser = this.users.find(user => user.username === currentUser);
      this.userId = foundUser ? foundUser.id : null;

      if (this.userId) {
        localStorage.setItem('userId', this.userId);

        // Fetch profileImg and store it in localStorage
        this.firebaseService.getUserById(this.userId).subscribe(
          (res: any) => {
            const newProfileImg = res.profileImg || 'assets/image1.png';  // Use default if null
            localStorage.setItem('profileImg', newProfileImg);
            this.authService.updateProfileImg(newProfileImg);

            // Navigate to /home only after storing profileImg
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error fetching profile image:', error);
          }
        );
      } else {
        console.error("Error: userId could not be set in localStorage.");
      }
    });
  }

  /*******************************************************************************/

  showWarn() {
    this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Wrong email or password' });
  }

  onSignUp() {
    this.isLoading = true;

    const user = this.signUpForm.value;

    this.firebaseService.signUp(user).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.toggleForm();
        console.log('successfully signed up: ', res);
      }, (error) => {
        this.isLoading = false;
        console.error("Error Stuff: ", error);

      }
    )
  }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
