import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { forkJoin } from 'rxjs';

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
  ) { }

  ngOnInit() {
    this.getFriends()
  }

  getFriends() {
    this.isLoading = true;
    this.firebaseSerivce.getUserById(this.currentUserId).subscribe(
      (res: any) => {
        // console.log(res.friends[0]);

        const counter = res.friends?.length;


        // Prepare an array of API requests
        const userRequests = [];

        for (let i = 0; i < counter; i++) {
          const chosenUser = res.friends[i]?.id;
          userRequests.push(this.firebaseSerivce.getUserById(chosenUser)); // Collect all the requests
        }

        // Use forkJoin to wait for all requests to finish
        forkJoin(userRequests).subscribe(
          (userResponses: any[]) => {
            // Filter out the 'password' field from each user object
            this.users = userResponses.map(user => {
              // const {userWithoutPassword } = user; // Destructure to remove 'password' & 'friendReq'
              return user; // Return the user object without the password
            });

            console.log('All users data without passwords:', this.users);
            this.isLoading = false;

          },
          (error) => {
            console.error('Error fetching user data: ', error);
            this.isLoading = false;

          }
        );
      },
      (error) => {
        console.error("Error fetching current user data: ", error);
        this.isLoading = false;
      }
    );
    this.isLoading = false
  }


  imgLoaded() {
    this.isImgLoading = false;
  }

  onSelect(index: any) {
    console.log(this.users[index])
  }
}
