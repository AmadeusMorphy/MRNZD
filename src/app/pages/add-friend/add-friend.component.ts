import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent {

  constructor(
    private firebaseService: FirebaseService
  ) { }

  users: any;

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.firebaseService.getUsers().subscribe(
      (res: any) => {
        this.users = Object.values(res).map((item: any) => {
          return {
            username: item.username,
            email: item.email
          }
        })
        console.log(this.users)
      }
    )
  }
}
