import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule, SkeletonModule],
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent {

  currentUserId: any;
  currentUsername: any;
  chosenFriend: any;
  currentUserBlock: any;
  isFriendReq: boolean = false;
  currentFriends: any;
  isImgLoading = true;

  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  users: any;

  ngOnInit() {
    this.getUsers()
    this.currentUserId = localStorage.getItem('userId');
    this.currentUsername = localStorage.getItem('userName');
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        this.currentFriends = res.friendReq?.map((item: any) => item.username)
        // console.log("Current friends: ", this.currentFriends);
        // console.log(res);
      }
    )


  }

  getUsers() {
    // console.log(this.currentFriends)
    this.firebaseService.getAllUsers().subscribe(
      (res: any) => {
        // console.log((res));

        const friendReqEmails = this.currentFriends
        this.users = Object.values(res).filter((item: any) => {
          // Exclude the current user
          if (item.username === this.currentUsername) return false;

          // Exclude users who already received a friend request from the current user
          if (item.friendReq?.some((req: any) => req.username === this.currentUsername)) return false;

          return true;
        });
        // console.log('aiedufgbail: ', Object.values(res).filter((item: any) => item.friendReq?.map((req: any) => req.username === this.currentUsername)))
        // console.log('except the current username: ', this.users)
      }
    );
  }

  sendReq(index: any) {

    this.chosenFriend = this.users[index];

    this.users[index].isFriendReq = this.users[index].isReq?.map((item: any) => item.isreq)[0];
    console.log(this.isFriendReq)
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        this.currentUserBlock = {
          username: res.username,
          email: res.email,
          profileImg: res.profileImg
        };

        console.log("you clicked on: ", this.users[index]);

        const selectedBlock = this.users[index];
        const selectedId = this.users[index].id;
        const currenFriendReq = this.users[index]?.friendReq

        if (currenFriendReq !== undefined) {
          this.chosenFriend = {
            ...selectedBlock,
            friendReq: [
              ...currenFriendReq,
              this.currentUserBlock
            ]
          };
        } else {
          this.chosenFriend = {
            ...selectedBlock,
            friendReq: [
              this.currentUserBlock
            ]
          }
        }

        this.firebaseService.sendFriendReq(selectedId, this.chosenFriend).subscribe(
          (res: any) => {
            // console.log("friend req sent successfully: ", res);
            this.showSuccess(this.users[index].username)
            // this.users[index].isReq == true
            this.getUsers()
            // console.log(this.users[index].isReq)
          }, (error) => {
            console.error("error stuff: ", error);
          }
        );
      },
      (error) => {
        console.error("Error fetching user by ID: ", error);
        console.log('Retrying...');
        this.sendReq(index);  // Retry logic
      }
    );
  }


  //   this.firebaseService.getUserById(this.currentUserId).subscribe(
  //     (res: any) => {
  //       const isReqAvailable = res.friendReq
  //       if (isReqAvailable) {
  //         this.currentUserBlock = {
  //           ...res,
  //           friendReq: [
  //             ...res.friendReq?.map((item: any) => item),
  //             this.chosenFriend
  //           ]
  //         }
  //       } else {
  //         this.currentUserBlock = {
  //           ...res,
  //           friendReq: [this.chosenFriend]
  //         }
  //       }
  //       console.log(this.currentUserBlock);

  //       const userBlock = this.currentUserBlock
  //       this.firebaseService.sendFriendReq(this.currentUserId, userBlock).subscribe(
  //         (res: any) => {
  //           this.isFriendReq = true
  //           console.log('friend req sent: ', res)
  //         }
  //       )
  //     }
  //   )
  //   console.log('you clicked on this: ', this.chosenFriend)
  // }
  imgLoaded() {
    this.isImgLoading = false
  }
  showSuccess(username: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Sent to ${username}` });
  }
}
