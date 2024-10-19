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
  constructor(
    private firebaseService: FirebaseService
  ) { }

  users: any;

  ngOnInit() {
    this.getUsers()
    this.currentUserId = localStorage.getItem('userId');
    this.currentUsername = localStorage.getItem('userName')
  }

  getUsers() {
    this.firebaseService.getUsers().subscribe(
      (res: any) => {
        this.users = Object.values(res).map((item: any) => {
          return {
            username: item.username,
            email: item.email,
            profileImg: item.profileImg
          }
        }).filter((user: any) => user.username !== this.currentUsername);
        console.log(this.users)
      }
    )
  }
}
