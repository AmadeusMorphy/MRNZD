import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'; // If you plan to use Authentication
import { getDatabase, provideDatabase } from '@angular/fire/database'; // If you plan to use Realtime Database
import { getStorage, provideStorage } from '@angular/fire/storage'; // If you plan to use Storage
import { environment } from '../environments/environment';
import { ButtonModule} from 'primeng/button'
import { AppComponent } from './app.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Card, CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox'
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component'
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialize Firebase
    provideAuth(() => getAuth()), // Import Authentication module if needed
    provideDatabase(() => getDatabase()), // Import Database module if needed
    provideStorage(() => getStorage()), // Import Storage module if needed
    ButtonModule,
    ReactiveFormsModule,
    FormsModule, 
    InputTextModule, 
    CardModule, 
    CheckboxModule, 
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    ToastModule,
    RippleModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }