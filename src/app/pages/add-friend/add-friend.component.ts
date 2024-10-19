import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [CommonModule, ButtonModule],
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
  constructor(
    private firebaseService: FirebaseService
  ) { }

  users: any;

  ngOnInit() {
    this.getUsers()
    this.currentUserId = localStorage.getItem('userId');
    this.currentUsername = localStorage.getItem('userName');
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        this.currentFriends = res.friendReq?.map((item: any) => item.username)
        console.log("Current friends: ", this.currentFriends);
        console.log(res);

      }
    )
  }

  getUsers() {
    console.log(this.currentFriends)
    this.firebaseService.getUsers().subscribe(
      (res: any) => {
        const friendReqEmails = this.currentFriends
        this.users = Object.values(res).map((item: any) => {
          return {
            username: item.username,
            email: item.email,
            profileImg: item.profileImg,
            isReq: this.isFriendReq
          };
        }).filter((user: any) =>
          !this.currentFriends?.includes(user.username) && user.username !== this.currentUsername
        );
        console.log("filtered users: ", this.users);
      }
    );
  }

  sendReq(index: any) {
    this.users[index].isReq = true
    this.chosenFriend = this.users[index];

    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        const isReqAvailable = res.friendReq
        if (isReqAvailable) {
          this.currentUserBlock = {
            ...res,
            friendReq: [
              ...res.friendReq?.map((item: any) => item),
              this.chosenFriend
            ]
          }
        } else {
          this.currentUserBlock = {
            ...res,
            friendReq: [this.chosenFriend]
          }
        }
        console.log(this.currentUserBlock);

        const userBlock = this.currentUserBlock
        this.firebaseService.sendFriendReq(this.currentUserId, userBlock).subscribe(
          (res: any) => {
            this.isFriendReq = true
            console.log('friend req sent: ', res)
          }
        )
      }
    )
    console.log('you clicked on this: ', this.chosenFriend)
  }
}
