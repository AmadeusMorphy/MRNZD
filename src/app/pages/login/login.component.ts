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
  template: `<div class="fade-in">

  <p-toast />
  <!----Loadin---->
  <div *ngIf="isLoading" class="overlay flex justify-content-center align-items-center">
      <div class=" flex justify-content-center align-items-center h-screen absolute">
          <!-- <div class="spinner">
              <div class="inner">
              </div>
          </div> -->
          <div class="loader"></div>
      </div>
  </div>
  <!-------------->

  <div class="stuff flex justify-content-center align-items-center bg-gray-950">
      <div class="glass-card p-6 border-round-lg w-full m-8 md:w-27rem">
          <div class="titleText text-center mb-6">
              <h2 class="text-7xl font-bold mb-1 title">Rizzar's Stuff</h2>
              <div class="titleCaptions">
                  <p class="text-400">Website is still under construction</p>
                  <p class="text-300">This website is owned by: <span class="Nizar">Nizar</span></p>
              </div>
              <div class="socialMedia flex justify-content-center align-items-center">
                  <a href="https://www.instagram.com/nizar_masadeh">
                      <button pButton class="p-button-raised p-button-social">
                          <i class="pi pi-instagram"></i>
                      </button>
                  </a>
                  <a href="https://www.github.com/NizarMasadeh">
                      <button pButton class="p-button-raised p-button-social">
                          <i class="pi pi-github"></i>
                      </button>
                  </a>
                  <a href="https://www.facebook.com/nizar.masadeh.7">
                      <button pButton class="p-button-raised p-button-social">
                          <i class="pi pi-facebook"></i>
                      </button>
                  </a>
              </div>
          </div>
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
              <div class="p-inputgroup flex justify-content-center align-items-center mb-4">
                  <span class="p-input-icon-left">
                      <i class="pi pi-user"></i>
                      <input pInputText placeholder="Email" type="email" formControlName="email"
                          class="w-full glass-input" />
                  </span>
              </div>
              <div class="p-inputgroup flex justify-content-center align-items-center mb-4">
                  <span class="p-input-icon-left">
                      <i class="pi pi-key"></i>
                      <input pInputText placeholder="password" type="password" formControlName="password"
                          class="w-full glass-input" />
                  </span>
              </div>
              <div class="loginBtn flex justify-content-center align-items-center pt-5">
                  <button pButton type="submit" label="Login"
                      class="w-19rem p-button-raised p-button-rounded p-button-glass"></button>
              </div>
          </form>
      </div>
  </div>
</div>` ,
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

    if (checkUser) {
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
