import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-dms',
  templateUrl: './dms.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dms.component.scss']
})
export class DmsComponent {
  cards = [
    { imgUrl: 'assets/card1.jpg', title: 'Card 1', description: 'Description 1' },
    { imgUrl: 'assets/card2.jpg', title: 'Card 2', description: 'Description 2' },
    { imgUrl: 'assets/card3.jpg', title: 'Card 3', description: 'Description 3' },
    { imgUrl: 'assets/card1.jpg', title: 'Card 4', description: 'Description 1' },
    { imgUrl: 'assets/card2.jpg', title: 'Card 5', description: 'Description 2' },
    { imgUrl: 'assets/card3.jpg', title: 'Card 6', description: 'Description 3' },
    { imgUrl: 'assets/card1.jpg', title: 'Card 7', description: 'Description 1' },
    { imgUrl: 'assets/card2.jpg', title: 'Card 8', description: 'Description 2' },
    { imgUrl: 'assets/card3.jpg', title: 'Card 9', description: 'Description 3' },
    // Add more cards as needed
  ];

  movies: any;

  constructor(
    private stuffService: StuffService
  ) { }

  ngOnInit(): void {
    this.getmovies();
  }

  getmovies() {
    this.stuffService.getMovies().subscribe(
      (res: any) => {
        this.movies = res.results.map((item: any) => ({
          title: item.title,
          description: item.overview,
          rating: item.vote_average,
          img: `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`

        }));
      }
    )
  }
  isPaused = false;

  onCardHover(isHovering: boolean) {
    this.isPaused = isHovering;
  }
}