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

  constructor() {}

  // postTest() {
  //   this.firebaseService.postData('username123', 'user@example.com', 'password123');
  // }
}
