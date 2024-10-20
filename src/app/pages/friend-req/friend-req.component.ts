import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

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
    this.getFriendReqs();
    
  }


  
  getFriendReqs() {
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        // console.log(res.friendReq?.length);
        // console.log(res.friendReq);
  
        const counter = res.friendReq?.length;
  
        // Prepare an array of API requests
        const userRequests = [];
  
        for (let i = 0; i < counter; i++) {
          const chosenUser = res.friendReq[i]?.id;
          console.log(chosenUser)
          userRequests.push(this.firebaseService.getUserById(chosenUser)); // Collect all the requests
        }
  
        // Use forkJoin to wait for all requests to finish
        forkJoin(userRequests).subscribe(
          (userResponses: any[]) => {
            // Filter out the 'password' field from each user object
            this.users = userResponses.map(user => {
              const { password, ...userWithoutPassword } = user; // Destructure to remove 'password'
              return userWithoutPassword; // Return the user object without the password
            });
  
            console.log('All users data without passwords:', this.users); // Log after all requests are done
          },
          (error) => {
            console.error('Error fetching user data: ', error);
          }
        );
      },
      (error) => {
        console.error("Error fetching current user data: ", error);
      }
    );
  }
  
  
  
  imgLoaded() {
    this.isImgLoading = false;
  }


  /*******SENSITIVE CODE*******/
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
              this.users[index].id
            ]
          }
        } else {
          this.currentUserBlock = {
            ...res,
            friendReq: filteredReqs,
            friends: [
              this.users[index].id
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
                        id: this.currentUserId
                      }
                    ]
                  }
                } else {
                  this.requestedBlock = {
                    ...res,
                    friends: [
                      {
                        id: this.currentUserId
                      }
                    ]
                  }
                }

                this.firebaseService.acceptFriendReq(this.requesterId, this.requestedBlock).subscribe(
                  (res: any) => {
                    console.log('Youre friends with them now too: ', res);


                    this.showSuccess(chosenName);
                    this.getFriendReqs();
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
  /****************************/

  onReject(index: any) {

    console.log(this.users[index]);
    
    const selectedUserId = this.users[index].id;
    this.firebaseService.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        console.log('without the smth: ', res.friendReq?.filter((item: any) => item.id !== selectedUserId).length)

        const currentFriendReq = res.friendReq?.filter((item: any) => item.id !== selectedUserId)
        if(currentFriendReq.length > 0) {
          
          this.currentUserBlock = {
            ...res,
            friendReq: currentFriendReq
          }
        } else {
          this.currentUserBlock = {
            ...res,
            friendReq: null
          }
        }

        this.firebaseService.rejectFriendReq(this.currentUserId, this.currentUserBlock).subscribe(
          (res: any) => {
            console.log('You reject the req: ', res);
            this.getFriendReqs();
          }, (error) => {
            console.error("error stuff: ", error);
            
          }
        )
        // this.currentUserBlock = {
        //   ...res,
        //   friendReq:
        // }
      }
    )

  }
  showSuccess(username: any) {
    this.messageService.add({ severity: 'success', detail: `You accepted ${username}` });
  }
}
