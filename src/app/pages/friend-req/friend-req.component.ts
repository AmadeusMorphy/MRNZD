import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
  requestedBlock: any;
  currentUserAcceptingBlock: any;
  requesterId: any;
  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getReqs();
    
  }

  getReqs() {
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        const friendUsernames = new Set(res.friends?.map((friend: any) => friend.username));
        this.users = res.friendReq?.filter((item: any) => {
          console.log(item)
          return !friendUsernames.has(item.username);
        });
        console.log(this.users);
        
      }
    );
  }
  
  
  imgLoaded() {
    this.isImgLoading = false;
  }

  onAccept(index: any) {
    console.log(this.users[index]);
    console.log(this.users[index].profileImg);
    const chosenName = this.users[index].username;
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        const isFriendsExit = res.friends?.map((item: any) => item);
        const filteredReqs = this.users.filter((item: any) => item.username !== this.users[index].username)

        if(isFriendsExit) {
          this.currentUserBlock = {
            ...res,
            friendReq: filteredReqs,
            friends: [
              ...isFriendsExit,
              this.users[index]
            ]
          }
        } else {
          this.currentUserBlock = {
            ...res,
            friendReq: filteredReqs,
            friends: [
              this.users[index]
            ]
          }
        }

        this.firebaseService.acceptFriendReq(this.currentUserId, this.currentUserBlock).subscribe(
          (res: any) => {
            console.log('Friend request accepted: ', res);

            this.requesterId = this.users[index].id
            this.firebaseService.getUserById(this.requesterId).subscribe(
              (res: any) => {
                const isReqFriendsExist = res?.friends?.map((friend: any) => friend);

                if(isReqFriendsExist) {
                  this.requestedBlock = {
                    ...res,
                    friends: [
                      ...isReqFriendsExist,
                      {
                        username: localStorage.getItem('userName'),
                        email: localStorage.getItem('userEmail'),
                        profileImg: localStorage.getItem('profileImg')
                      }
                    ]
                  }
                } else {
                  this.requestedBlock = {
                    ...res,
                    friends: [
                      {
                        username: localStorage.getItem('userName'),
                        email: localStorage.getItem('userEmail'),
                        profileImg: localStorage.getItem('profileImg')
                      }
                    ]
                  }
                }

                this.firebaseService.acceptFriendReq(this.requesterId, this.requestedBlock).subscribe(
                  (res: any) => {
                    console.log('Youre friends with them now too: ', res);


                    this.getReqs();
                    this.showSuccess(chosenName)
                  }, (error) => {
                    console.error("error stuff", error);
                    
                  }
                )
              }
            )
       
          }, (error) => {
            console.error("Error stuff", error);
            
          }
        )
      }
    )
  }

  onSelect(index: any) {
    console.log('you chose this: ', this.users.filter((item: any) => item.username !== this.users[index].username))
  }
  showSuccess(username: any) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `You accepted ${username}` });
  }
}
