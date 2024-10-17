import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { StuffService } from 'src/app/services/stuff.service';

@Component({
  selector: 'app-image-loader',
  standalone: true,
  imports: [CommonModule, SkeletonModule, NgOptimizedImage],
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent {

  movieImgs: any;
  isImgLoading: boolean = true;
  isImgLoaded: boolean = false;
  constructor(
    private stuffService: StuffService
  ) { }


  ngOnInit(): void {
    this.showMovies()
  }


  showMovies() {
    this.stuffService.getMovies().subscribe(
      (res: any) => {

        this.movieImgs = res.results.map((item: any) => {
          const imgUrl = `https://i0.wp.com/www.themoviedb.org/t/p/w185${item.poster_path}`;
          return {
            title: item.title,
            desciption: item.overview,
            rating: item.vote_average,
            img: imgUrl
          }
        })
      }

    )
  }

  imgLoaded(index: any) {
    this.isImgLoading = false;
    this.isImgLoaded = true;
  }
}
