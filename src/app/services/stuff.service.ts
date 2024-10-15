import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(
    private http: HttpClient
  ) { }


  getNews(): Observable<any> {
    return this.http.get(environment.newsAPI)
  }

  getMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTEyMGQxNDNmN2MyYmU5ODc0ZmJlNjk5Y2VlZWU1NyIsIm5iZiI6MTcyOTAxOTUyMC43OTYyNjMsInN1YiI6IjY2ZWRjMzk5N2ZmMmJmNTdjZDI1YzM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOwyzV6lR5clCajqExC9K5PFMew31YZqzMzT3FXqz9E'
    });

    return this.http.get(environment.moviesApi, { headers });
  }
  getMoviesTrending(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTEyMGQxNDNmN2MyYmU5ODc0ZmJlNjk5Y2VlZWU1NyIsIm5iZiI6MTcyOTAxOTUyMC43OTYyNjMsInN1YiI6IjY2ZWRjMzk5N2ZmMmJmNTdjZDI1YzM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOwyzV6lR5clCajqExC9K5PFMew31YZqzMzT3FXqz9E'
    });

    return this.http.get(environment.moviesTrending, { headers });
  }
  getMoviesPopular(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTEyMGQxNDNmN2MyYmU5ODc0ZmJlNjk5Y2VlZWU1NyIsIm5iZiI6MTcyOTAxOTUyMC43OTYyNjMsInN1YiI6IjY2ZWRjMzk5N2ZmMmJmNTdjZDI1YzM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOwyzV6lR5clCajqExC9K5PFMew31YZqzMzT3FXqz9E'
    });

    return this.http.get(environment.moviesPopular, { headers });
  }
  getMoviesTopRated(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTEyMGQxNDNmN2MyYmU5ODc0ZmJlNjk5Y2VlZWU1NyIsIm5iZiI6MTcyOTAxOTUyMC43OTYyNjMsInN1YiI6IjY2ZWRjMzk5N2ZmMmJmNTdjZDI1YzM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOwyzV6lR5clCajqExC9K5PFMew31YZqzMzT3FXqz9E'
    });

    return this.http.get(environment.moviesTopRated, { headers });
  }

}
