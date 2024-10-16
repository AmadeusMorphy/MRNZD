import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  standalone: true,
  imports: [CommonModule, ToastModule, SkeletonModule, MenuModule, ImageModule],
  styleUrls: ['./posts.component.scss']
})
export default class PostsComponent {
  username: string = 'Username';
  postTime: string = '2 hours ago';
  postLikes: number = 23;
  isLiked: boolean = false;
  isShared: boolean = false;
  isBookmarked: boolean = false
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
