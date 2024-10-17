import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StuffService } from 'src/app/services/stuff.service';
import { take } from 'rxjs/operators';

interface Movie {
  title: string;
  description: string;
  rating: number;
  img: string;
}

interface Account {
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ToastModule, CommonModule, SkeletonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {
  accs: Account[] = [];
  Movies: Movie[] = [];
  isLoading = false;
  isImgLoading = true;

  private readonly LOGIN_PATH = '/login';

  constructor(
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private stuffService: StuffService
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.fetchFirebaseData();
    this.fetchMoviesData();
  }

  private fetchFirebaseData(): void {
    this.firebaseService.getApi().pipe(take(1)).subscribe(
      (res: any) => {
        this.accs = Object.values(res).map((item: any) => ({
          email: item.email,
          username: item.username,
          password: item.password
        }));
      },
      (error) => console.error('Error fetching account data:', error)
    );
  }

  private fetchMoviesData(): void {
    this.isLoading = true;
    this.stuffService.getMovies().pipe(take(1)).subscribe(
      (res: any) => {
        this.Movies = res.results.map((item: any) => ({
          title: item.title,
          description: item.overview,
          rating: item.vote_average,
          img: `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching movies data:', error);
        this.isLoading = false;
      }
    );
  }

  private checkLoginStatus(): void {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigateByUrl(this.LOGIN_PATH);
    }
  }

  logout(): void {
    this.authService.logout();
    console.log('User logged out successfully');
    this.router.navigate([this.LOGIN_PATH]);
  }

  imgLoaded(index: number): void {
    console.log(`Image loaded at index ${index}`);
    this.isImgLoading = false;
  }
}
