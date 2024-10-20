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
  imgLoadingStates: boolean[] = [];
  isLoading = false;

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
    this.isLoading = true;
    // console.log(this.currentFriends)
    this.firebaseService.getAllUsers().subscribe(
      (allUsers: any) => {
        // console.log((allUsers));

        this.firebaseService.getUserById(this.currentUserId).subscribe(
          (res: any) => {
            this.currentFriends = res.friends;
            this.imgLoadingStates = new Array(this.users.length).fill(true);
            // console.log('current friends: ', this.currentFriends);

          }
        )
        this.users = Object.values(allUsers).filter((item: any) => {
          // Exclude the current user
          if (item.username === this.currentUsername) return false;

          // Exclude users who already received a friend request from the current user
          if (item.friendReq?.some((req: any) => req.id === this.currentUserId)) return false;


          if (item.friends?.map((friend: any) => friend === this.currentUserId)) return false;


          return true;
        });
        // this.users = Object.values(res).filter((item: any) => item.friendReq?.map((req: any) => req.username === this.currentUsername));
        // console.log('aiedufgbail: ',  Object.values(res).filter((item: any) => item.friendReq?.some((req: any) => req.username)));
        // console.log('except the current username: ', this.users.map((item: any) => item.id));
        this.isLoading = false;
      }, (error) => {
        console.error('Error stuff', error);
        this.isLoading = false;
      }
    );
  }

  sendReq(index: any) {


    this.chosenFriend = this.users[index];

    this.users[index].isFriendReq = this.users[index].isReq?.map((item: any) => item.isreq)[0];
    // console.log(this.isFriendReq)
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        this.currentUserBlock = {
          username: res.username,
          email: res.email,
          profileImg: res.profileImg,
          id: localStorage.getItem('userId')
        };

        // console.log("you clicked on: ", this.users[index]);

        const selectedBlock = this.users[index];
        const selectedId = this.users[index].id;
        const currenFriendReq = this.users[index]?.friendReq

        if (currenFriendReq !== undefined) {
          this.chosenFriend = {
            ...selectedBlock,
            friendReq: [
              ...currenFriendReq,
              { id: this.currentUserBlock.id }
            ]
          };
        } else {
          this.chosenFriend = {
            ...selectedBlock,
            friendReq: [
              { id: this.currentUserBlock.id }
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

  imgLoaded(index: number) {
    this.imgLoadingStates[index] = false;
  }
  showSuccess(username: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Sent to ${username}` });
  }
}
