import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ToastModule, CommonModule, SkeletonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {

  accs: any;
  News: any;
  Movies: any;
  MoviesTrending: any;
  MoviesPopular: any;
  MoviesTopRated: any;
  isLoading: boolean = false;
  isImgLoading: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private stuffService: StuffService
  ) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.firebaseService.getApi();
    this.showMovies();
  }

  showData() {
    this.firebaseService.getApi().subscribe(
      (res: any) => {
        // console.log('REST api results: ', Object.values(res).map((user:any) => user.email));
        // console.log('REST api: ', res)
        this.accs = Object.values(res).map((item: any) => {
          return {
            email: item.email,
            username: item.username,
            password: item.password
          }
        })

        // console.log(this.accs)
      }, (error) => {
        console.error('error stuff: ', error)
      }
    )
  }

  showMovies() {
    this.isLoading = true;
    this.stuffService.getMovies().subscribe(
      (res: any) => {
        this.Movies = res.results.map((item: any) => {
          const imgUrl = `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`;
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: imgUrl
          }
        })
        this.isLoading = false;
      }
    )
  }

  checkLoginStatus(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
    } else {
      this.router.navigateByUrl("/login")
    }
  }

  logout(): void {
    this.authService.logout()
    console.log('User logged out successfully');
    this.router.navigate(['/login']);
  }
  imgLoaded(index: any) {
    console.log('image loaded', index)
    this.isImgLoading = false;
  }
}
