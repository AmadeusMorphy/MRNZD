import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-friend-req',
  standalone: true,
  imports: [CommonModule, ButtonModule, SkeletonModule, ToastModule],
  templateUrl: './friend-req.component.html',
  styleUrls: ['./friend-req.component.scss']
})
export class FriendReqComponent {

  currentUserId = localStorage.getItem('userId');
  users: any;
  isImgLoading = true;
  currentUserBlock: any;
  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getReqs();
  }

  getReqs() {
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        this.users = res.friendReq?.map((item: any) => {
          return item;
        })
      }
    )
  }
  
  imgLoaded() {
    this.isImgLoading = false;
  }

  onAccept(index: any) {
    console.log(this.users[index]);
    console.log(this.users[index].profileImg);

    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        const isFriendsExit = res.friends?.map((item: any) => item)

        if(isFriendsExit) {
          this.currentUserBlock = {
            ...res,
            friends: [
              ...isFriendsExit,
              this.users[index]
            ]
          }
        } else {
          this.currentUserBlock = {
            ...res,
            friends: [
              this.users[index]
            ]
          }
        }

        this.firebaseService.acceptFriendReq(this.currentUserId, this.currentUserBlock).subscribe(
          (res: any) => {
            console.log('Friend request accepted: ', res);
            
          }, (error) => {
            console.error("Error stuff", error);
            
          }
        )
      }
    )
  }
}
