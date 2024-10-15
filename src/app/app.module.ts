import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ButtonModule } from 'primeng/button'
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
import { MenubarModule } from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HeaderComponent } from './pages/header/header.component';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { PostsComponent } from './pages/posts/posts.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, HeaderComponent, PostsComponent],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
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
    BrowserAnimationsModule,
    MenubarModule,
    ConfirmDialogModule,
    AvatarModule, 
    StyleClassModule,
    SidebarModule,
    MenuModule,
    ImageModule,
    SkeletonModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }