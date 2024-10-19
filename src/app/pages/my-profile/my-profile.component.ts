import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FileUploadModule, DialogModule, ToastModule, SkeletonModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  visible: boolean = false;
  uploadedFiles: any[] = [];
  imageUrl: any;
  isLoading: boolean = false;
  currentUserId: any;
  profImg: any;
  isDelete: boolean = false
  userName: any;
  checkLength: any;
  dateJoined: Date | null = null;
  currentUserData: any;
  compressedImg: any;
  currentUserImg: string = '';
  formattedDateJoined: string = '';
  isImgLoading = true;
  constructor(
    private firebaseService: FirebaseService,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit() {

    this.firebaseService.getUserById(localStorage.getItem('userId')).subscribe(
      (res: any) => {
        this.userName = res.username,
          this.profImg = res.profileImg;

        const onDateJoined = res.dateCreated;
        const dateJoined = new Date(onDateJoined); // Convert to Date object

        if (!isNaN(dateJoined.getTime())) { // Check if valid date
          this.formattedDateJoined = this.formatDate(dateJoined);
        } else {
          console.error('Invalid date format:', onDateJoined);
        }

        console.log(res);
      }
    );
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file); // Store uploaded files in the array
      this.uploadImageToImgBB(file);
    }
  }

  uploadImageToImgBB(file: File): void {
    this.isLoading = true;
    this.imageUploadService.uploadImage(file).subscribe(
      response => {
        if (response && response.data && response.data.url) {
          console.log('Image uploaded successfully:', response.data.url);
          this.imageUrl = response.data.url;
          this.putImgDb()
          this.isLoading = false;
          this.visible = false

        }
      },
      error => {
        this.isLoading = false;
        console.error('Upload failed:', error);
      }
    );
  }

  onEdit() {
    this.visible = true;
  }
  putImgDb() {
    const user = localStorage.getItem('userId');
    this.currentUserId = user

    const img = {
      profileImg: this.imageUrl
    }


    this.firebaseService.uploadImage(this.currentUserId, img).subscribe(
      (updateUs) => {

        console.log('image to the user: ', this.imageUrl)
        console.log('ADDED TO THE DB: ', updateUs);
        window.location.reload()
      },
      (error) => {
        console.error('Error Bitch: ', error)
      }
    );
  }

  imgLoaded() {
    this.isImgLoading = false
  }

}
