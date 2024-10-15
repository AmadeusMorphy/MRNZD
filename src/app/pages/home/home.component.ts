import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, MenuItemCommandEvent } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items: MenuItem[] | undefined;
  accs: any;
  News: any;
  Movies: any;
  MoviesTrending: any;
  MoviesPopular: any;
  MoviesTopRated: any;
  imgTest!: string;
  movieImg!: string;
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private stuffService: StuffService
  ) { }

  ngOnInit() {
    this.checkLoginStatus();

    this.firebaseService.getApi();
    this.showMovies();
    this.showMoviesTrending();
    this.showMoviesPopular()
    this.showMoviesTopRated()
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              }
            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: (event: MenuItemCommandEvent) => this.confirm1(event)
      }
    ];

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

  showNews() {
    this.stuffService.getNews().subscribe(
      (res: any) => {
        console.log("News data: ", res)

        this.News = res.articles.map((item: any) => {
          return {
            title: item.title,
            description: item.description,
            publishedAt: item.publishedAt,
            category: item.source.name,
            urlImg: item.urlToImage,
            url: item.url,
            Title: item.title
          }
        })
        console.log('the extracted data: ', this.News)
      }
    )
  }

  showMovies() {
    this.stuffService.getMovies().subscribe(
      (res: any) => {

        this.imgTest = res.results[0].poster_path;

        this.movieImg = `https://i0.wp.com/www.themoviedb.org/t/p/w185${this.imgTest}`
        this.Movies = res.results.map((item: any) => {
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`
          }
        })
      }
    )
  }

  showMoviesTrending() {
    this.stuffService.getMoviesTrending().subscribe(
      (res: any) => {

        this.imgTest = res.results[0].poster_path;

        this.movieImg = `https://i0.wp.com/www.themoviedb.org/t/p/w185${this.imgTest}`
        this.MoviesTrending = res.results.map((item: any) => {
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`
          }
        })
      }
    )
  }
  showMoviesPopular() {
    this.stuffService.getMoviesPopular().subscribe(
      (res: any) => {

        this.imgTest = res.results[0].poster_path;

        this.movieImg = `https://i0.wp.com/www.themoviedb.org/t/p/w185${this.imgTest}`
        this.MoviesPopular = res.results.map((item: any) => {
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`
          }
        })
      }
    )
  }
  showMoviesTopRated() {
    this.stuffService.getMoviesTopRated().subscribe(
      (res: any) => {

        this.imgTest = res.results[0].poster_path;

        this.movieImg = `https://i0.wp.com/www.themoviedb.org/t/p/w185${this.imgTest}`
        this.MoviesTopRated = res.results.map((item: any) => {
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`
          }
        })
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


  confirm1(event: MenuItemCommandEvent) {
    this.confirmationService.confirm({
      target: event.originalEvent as unknown as EventTarget,
      message: 'Are you sure that you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this.logout()
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  logout(): void {
    this.authService.logout()
    console.log('User logged out successfully');


    this.router.navigate(['/login']);
  }
}
