import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, SkeletonModule, ButtonModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {

  currentUserId = localStorage.getItem('userId');
  users: any;
  isImgLoading = true;
  isLoading = false;
  constructor(
    private firebaseSerivce: FirebaseService
  ) {}

  ngOnInit() {
    this.getFriends()
  }

  getFriends() {

    this.isLoading = true;
    this.firebaseSerivce.getUserById(this.currentUserId).subscribe(
      (res: any) => {

        this.users = res.friends?.map((item: any) => {
          this.isLoading = false;
          return item;
        })
      }, (error) => {
        console.error("error stuff: ", error);
        this.isLoading = false;
      }
    )
  }

  imgLoaded() {
    this.isImgLoading = false;
  }

  onSelect(index: any) {
    console.log(this.users[index])
  }
}
