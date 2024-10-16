import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, MenuItemCommandEvent } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ToastModule, CommonModule, SkeletonModule],
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
  imgTest!: string;
  movieImg!: string;
  Moviess: any[] = []; // Your movies data
  loadingStates: { [key: string]: boolean } = {}; // To track loading state for each image

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private stuffService: StuffService,
    private checkstuff: ChangeDetectorRef
  ) {
    this.Moviess.forEach(movie => {
      this.loadingStates[movie.img] = true; // Set all images to loading state initially
    });
  }

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

        this.imgTest = res.results[0].poster_path;
        this.movieImg = `https://i0.wp.com/www.themoviedb.org/t/p/w185${this.imgTest}`
        this.Movies = res.results.map((item: any) => {
          const imgUrl = `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`;
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: imgUrl
          }
        })
        this.Movies.forEach((movie: any) => {
          this.loadingStates[movie.img] = false;
          this.checkstuff// Set loading to true for each image
        });
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

  onImageLoad(imageUrl: string): void {
    this.loadingStates[imageUrl] = true;
    if (imageUrl) {
      this.loadingStates[imageUrl] = false //YOU NEED TO WORK ON THIS, SITTING THIS FALSE SHOULD WORK BUT THE SKELETON IS NOT SHOWING
      console.log('its loaded')
      return;
    } else {
      this.loadingStates[imageUrl] = true;
    };
    this.checkstuff
  }

  onImageError(imageUrl: string): void {
    this.loadingStates[imageUrl] = false;
  }
}
