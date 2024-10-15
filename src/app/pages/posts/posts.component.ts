import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  username: string = 'Username';
  postTime: string = '2 hours ago';
  postLikes: number = 23;
  isLiked: boolean = false;
  isShared: boolean = false;
  isBookmarked: boolean = false;
  isLoadingImg: boolean = true; // Initialize loading state
  imageError: boolean = false;   // Flag for image loading error
  imageUrl: string = "https://cmsphoto.ww-cdn.com/superstatic/40142/art/grande/21371695-24434585.jpg?v=1571314400.6397533&force_webp=1"; // Image URL
  defaultImage: string = "https://via.placeholder.com/400"; // Default image in case of error


  postItems: MenuItem[] | undefined;


  ngOnInit(): void {

    this.postItems = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Refresh',
                  icon: 'pi pi-refresh'
              },
              {
                  label: 'Export',
                  icon: 'pi pi-upload'
              }
          ]
      }
  ];
  }


  @HostListener('window:load', ['$event.target'])
onWindowLoad(event: Event) {
  const imgElement = event as unknown as HTMLImageElement;
  if (imgElement.src === this.imageUrl) {
    this.onImageLoad();
  }
}

@HostListener('window:error', ['$event.target'])
onWindowError(event: Event) {
  const imgElement = event as unknown as HTMLImageElement;
  if (imgElement.src === this.imageUrl) {
    this.onImageError();
  }
}

onImageLoad() {
  console.log("Image loaded successfully!");
  this.isLoadingImg = false; // Hide skeleton on successful load
  this.imageError = false; // Reset image error state
}

onImageError() {
  console.error("Image failed to load.");
  this.isLoadingImg = false; // Hide skeleton on error
  this.imageError = true; // Set image error state
}
  toggleLike(): void {
    this.isLiked = !this.isLiked;
    this.isLiked ? this.postLikes++ : this.postLikes--;
  }

  toggleShare(): void {
    this.isShared = !this.isShared;
  }

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
  }
}
